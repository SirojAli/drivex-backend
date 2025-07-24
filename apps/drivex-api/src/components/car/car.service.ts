import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Cars, Car } from '../../libs/dto/car/car';
import { MemberService } from '../member/member.service';
import {
	SellerCarsInquiry,
	AllCarsInquiry,
	OrdinaryInquiry,
	CarsInquiry,
	CarInput,
} from '../../libs/dto/car/car.input';
import { Direction, Message } from '../../libs/enums/common.enum';
import { ViewService } from '../view/view.service';
import { StatisticModifier, T } from '../../libs/types/common';
import { CarStatus } from '../../libs/enums/car.enum';
import { ViewGroup } from '../../libs/enums/view.enum';
import { CarUpdate } from '../../libs/dto/car/car.update';
import * as moment from 'moment';
import { lookupAuthMemberLiked, lookupMember, shapeIntoMongoObjectId } from '../../libs/config';
import { LikeService } from '../like/like.service';
import { LikeInput } from '../../libs/dto/like/like.input';
import { LikeGroup } from '../../libs/enums/like.enum';

@Injectable()
export class CarService {
	constructor(
		@InjectModel('Car') private readonly carModel: Model<Car>,
		private memberService: MemberService,
		private viewService: ViewService,
		private likeService: LikeService,
	) {}

	public async createCar(input: CarInput): Promise<Car> {
		try {
			const result = await this.carModel.create(input);
			await this.memberService.memberStatsEditor({
				_id: result.memberId,
				targetKey: 'memberCars',
				modifier: 1,
			});
			return result;
		} catch (err) {
			console.log('Error, Service.model:', err.message);
			throw new BadRequestException(Message.CREATE_FAILED);
		}
	}

	public async getCar(memberId: ObjectId, carId: ObjectId): Promise<Car> {
		const search: T = {
			_id: carId,
			carStatus: CarStatus.ACTIVE,
		};

		const targetCar: Car = await this.carModel.findOne(search).lean().exec();
		if (!targetCar) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		if (memberId) {
			const viewInput = { memberId: memberId, viewRefId: carId, viewGroup: ViewGroup.CAR };
			const newView = await this.viewService.recordView(viewInput);
			if (newView) {
				await this.carStatsEditor({ _id: carId, targetKey: 'carViews', modifier: 1 });
				targetCar.carViews++;
			}
			// meLiked
			const likeInput = { memberId: memberId, likeRefId: carId, likeGroup: LikeGroup.CAR };
			targetCar.meLiked = await this.likeService.checkLikeExistence(likeInput);
		}

		targetCar.memberData = await this.memberService.getMember(null, targetCar.memberId);
		return targetCar;
	}

	public async updateCar(memberId: ObjectId, input: CarUpdate): Promise<Car> {
		let { carStatus, soldAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			memberId: memberId,
			carStatus: CarStatus.ACTIVE,
		};

		if (carStatus === CarStatus.SOLD) soldAt = moment().toDate();
		else if (carStatus === CarStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.carModel
			.findOneAndUpdate(
				search, //
				input, //
				{ new: true }, //
			)
			.exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		if (soldAt || deletedAt) {
			await this.memberService.memberStatsEditor({
				_id: memberId,
				targetKey: 'memberCars',
				modifier: -1,
			});
		}
		return result;
	}

	public async getCars(memberId: ObjectId, input: CarsInquiry): Promise<Cars> {
		const match: T = { carStatus: { $in: [CarStatus.ACTIVE, CarStatus.SOLD] } };
		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		this.shapeMatchQuery(match, input);
		console.log('match:', match);

		const result = await this.carModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupAuthMemberLiked(memberId),
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		console.log('result:', result);

		if (!result.length) {
			throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		}

		return result[0];
	}

	public async getSellerCars(memberId: ObjectId, input: SellerCarsInquiry): Promise<Cars> {
		const { carStatus, carYear } = input.search;

		if (carStatus === CarStatus.DELETE) {
			throw new BadRequestException(Message.NOT_ALLOWED_REQUEST);
		}

		const match: T = {
			memberId: memberId,
			carStatus: carStatus ?? { $ne: CarStatus.DELETE },
			...(carYear ? { carYear } : {}),
		};

		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result = await this.carModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		console.log('result:', result);

		if (!result.length) {
			throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		}

		return result[0];
	}

	// For Favorite Cars
	public async getFavorites(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
		return await this.likeService.getFavoriteCars(memberId, input);
	}

	// For Visited Cars
	public async getVisited(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
		return await this.viewService.getVisitedCars(memberId, input);
	}

	public async likeTargetCar(memberId: ObjectId, likeRefId: ObjectId): Promise<Car> {
		const target: Car = await this.carModel
			.findOne({
				_id: likeRefId,
				carStatus: CarStatus.ACTIVE,
			})
			.exec();
		if (!target) throw new InternalServerErrorException(Message.NO_DATA_FOUND);

		const input: LikeInput = {
			memberId: memberId,
			likeRefId: likeRefId,
			likeGroup: LikeGroup.CAR,
		};

		const modifier: number = await this.likeService.toggleLike(input);
		const result = await this.carStatsEditor({
			_id: likeRefId,
			targetKey: 'carLikes',
			modifier: modifier,
		});

		if (!result) throw new InternalServerErrorException(Message.SOMETHING_WENT_WRONG);
		return result;
	}

	// /** ADMIN **/
	public async getAllCarsByAdmin(input: AllCarsInquiry): Promise<Cars> {
		const { carStatus, carBrand, carYear } = input.search;

		const match: T = {};

		if (carStatus) {
			match.carStatus = carStatus;
		}
		if (carBrand) {
			match.carBrand = { $in: carBrand };
		}
		if (carYear) {
			match.carYear = carYear;
		}

		const sort: T = { [input?.sort ?? 'createdAt']: input?.direction ?? Direction.DESC };

		const result = await this.carModel
			.aggregate([
				{ $match: match },
				{ $sort: sort },
				{
					$facet: {
						list: [
							{ $skip: (input.page - 1) * input.limit },
							{ $limit: input.limit },
							lookupMember,
							{ $unwind: '$memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();

		console.log('result:', result);

		if (!result.length) {
			throw new InternalServerErrorException(Message.NO_DATA_FOUND);
		}

		return result[0];
	}

	public async updateCarByAdmin(input: CarUpdate): Promise<Car> {
		let { carStatus, soldAt, deletedAt } = input;
		const search: T = {
			_id: input._id,
			carStatus: CarStatus.ACTIVE,
		};

		if (carStatus === CarStatus.SOLD) soldAt = moment().toDate();
		else if (carStatus === CarStatus.DELETE) deletedAt = moment().toDate();

		const result = await this.carModel.findOneAndUpdate(search, input, { new: true }).exec();
		if (!result) throw new InternalServerErrorException(Message.UPDATE_FAILED);

		if (soldAt || deletedAt) {
			await this.memberService.memberStatsEditor({
				_id: result.memberId,
				targetKey: 'memberCars',
				modifier: -1,
			});
		}
		return result;
	}

	public async removeCarByAdmin(carId: ObjectId): Promise<Car> {
		const search: T = { _id: carId, carStatus: CarStatus.DELETE };
		const result = await this.carModel.findOneAndDelete(search).exec();
		if (!result) throw new InternalServerErrorException(Message.REMOVE_FAILED);
		return result;
	}

	/** Additional Logics **/
	public async carStatsEditor(input: StatisticModifier): Promise<Car> {
		console.log('executed');
		const { _id, targetKey, modifier } = input;
		return await this.carModel
			.findByIdAndUpdate(
				_id, //
				{ $inc: { [targetKey]: modifier } }, //
				{ new: true }, //
			)
			.exec();
	}

	private shapeMatchQuery(match: T, input: CarsInquiry): void {
		const {
			memberId,
			carStatus,
			carBrand,
			carModel,
			carType,
			carFuelType,
			carTransmission,
			carDriveType,
			carColor,
			carPrice,
			carYear,
			carSeats,
			carDoors,
			carEngineSize,
			text,
		} = input.search;

		// Shape ObjectId
		if (memberId) {
			match.memberId = shapeIntoMongoObjectId(memberId);
		}

		// Enums & Array Filters
		if (carStatus?.length) {
			match.carStatus = { $in: carStatus };
		} else {
			match.carStatus = { $in: [CarStatus.ACTIVE, CarStatus.SOLD] };
		}
		if (carBrand?.length) match.carBrand = { $in: carBrand };
		if (carType?.length) match.carType = { $in: carType };
		if (carFuelType?.length) match.carFuelType = { $in: carFuelType };
		if (carTransmission?.length) match.carTransmission = { $in: carTransmission };
		if (carDriveType?.length) match.carDriveType = { $in: carDriveType };

		// Scalar Filters
		if (carModel) match.carModel = carModel;
		if (carColor) match.carColor = carColor;
		if (carYear !== undefined) match.carYear = carYear;

		// Range Filters
		if (carPrice) {
			match.carPrice = {
				$gte: carPrice.min,
				$lte: carPrice.max,
			};
		}

		if (carSeats !== undefined) match.carSeats = { $gte: carSeats };
		if (carDoors !== undefined) match.carDoors = { $gte: carDoors };
		if (carEngineSize !== undefined) match.carEngineSize = { $gte: carEngineSize };

		// Text Search (carModel)
		if (text?.trim()) {
			match.carModel = { $regex: new RegExp(text.trim(), 'i') };
		}
	}
}
