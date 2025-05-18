import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Like, MeLiked } from '../../libs/dto/like/like';
import { LikeInput } from '../../libs/dto/like/like.input';
import { T } from '../../libs/types/common';
import { Message } from '../../libs/enums/common.enum';
import { OrdinaryInquiry } from '../../libs/dto/car/car.input';
import { Cars } from '../../libs/dto/car/car';
import { LikeGroup } from '../../libs/enums/like.enum';
import { lookupFavorite } from '../../libs/config';

@Injectable()
export class LikeService {
	constructor(@InjectModel('Like') private readonly likeModel: Model<Like>) {}

	public async toggleLike(input: LikeInput): Promise<number> {
		console.log('executed');

		const search: T = { memberId: input.memberId, likeRefId: input.likeRefId };
		const exist = await this.likeModel.findOne(search).exec();
		let modifier = 1;

		if (exist) {
			await this.likeModel.findOneAndDelete(search).exec();
			modifier = -1;
		} else {
			try {
				await this.likeModel.create(input);
			} catch (err) {
				console.log('ERROR, Service.model:', err.message);
				throw new BadRequestException(Message.CREATE_FAILED);
			}
		}

		console.log(`-- Like Modifier ${modifier} --`);
		return modifier;
	}

	public async checkLikeExistence(input: LikeInput): Promise<MeLiked[]> {
		const { memberId, likeRefId } = input;
		const result = await this.likeModel
			.findOne({
				memberId: memberId,
				likeRefId: likeRefId,
			})
			.exec();
		return result
			? [
					{
						memberId: memberId,
						likeRefId: likeRefId,
						myFavorite: true,
					},
				]
			: [];
	}

	// For Favorite Cars
	public async getFavoriteCars(memberId: ObjectId, input: OrdinaryInquiry): Promise<Cars> {
		const { page, limit } = input;
		const match: T = { likeGroup: LikeGroup.CAR, memberId: memberId };

		const data: T = await this.likeModel
			.aggregate([
				{ $match: match },
				{ $sort: { updatedAt: -1 } },
				{
					$lookup: {
						from: 'cars',
						localField: 'likeRefId',
						foreignField: '_id',
						as: 'favoriteCar',
					},
				},
				{ $unwind: '$favoriteCar' },
				{
					$facet: {
						list: [
							{ $skip: (page - 1) * limit },
							{ $limit: limit },
							lookupFavorite,
							{ $unwind: '$favoriteCar.memberData' },
						],
						metaCounter: [{ $count: 'total' }],
					},
				},
			])
			.exec();
		// console.log('data:', data);
		const result: Cars = { list: [], metaCounter: data[0].metaCounter };

		result.list = data[0].list.map((ele) => ele.favoriteCar);
		console.log('result:', result);
		return result;
	}
}
