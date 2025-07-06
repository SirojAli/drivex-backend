import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarDriveType } from '../../enums/car.enum';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';

@ObjectType()
export class Car {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => CarStatus)
	carStatus: CarStatus;

	@Field(() => CarBrand)
	carBrand: CarBrand;

	@Field(() => String)
	carModel: string;

	@Field(() => CarType)
	carType: CarType;

	@Field(() => Int)
	carYear: number;

	@Field(() => Int)
	carPrice: number;

	@Field(() => CarFuelType)
	carFuelType: CarFuelType;

	@Field(() => CarTransmission)
	carTransmission: CarTransmission;

	@Field(() => String)
	carColor: string;

	@Field(() => [String])
	carImages: string[];

	@Field(() => String, { nullable: true })
	carDescription?: string;

	@Field(() => Int)
	carComments: number;

	@Field(() => Int)
	carRank: number;

	@Field(() => Int)
	carLikes: number;

	@Field(() => Int)
	carViews: number;

	@Field(() => String)
	carVinNumber: string;

	@Field(() => Boolean)
	carIsNew: boolean;

	@Field(() => Int)
	carEngineSize: number;

	@Field(() => Int)
	carMaxSpeed: number;

	@Field(() => Int)
	carSeats: number;

	@Field(() => Int)
	carDoors: number;

	@Field(() => Int)
	carCityMpg: number;

	@Field(() => Int)
	carHighwayMpg: number;

	@Field(() => Int)
	carCylinders: number;

	@Field(() => CarDriveType)
	carDriveType: CarDriveType;

	@Field(() => String)
	memberId: ObjectId;

	@Field(() => Date, { nullable: true })
	soldAt?: Date;

	@Field(() => Date, { nullable: true })
	deletedAt?: Date;

	@Field(() => Date)
	createdAt: Date;

	@Field(() => Date)
	updatedAt: Date;

	/** from aggregation **/
	@Field(() => [MeLiked], { nullable: true })
	meLiked?: MeLiked[];

	@Field(() => Member, { nullable: true })
	memberData?: Member;
}

@ObjectType()
export class Cars {
	@Field(() => [Car])
	list: Car[];

	@Field(() => [TotalCounter], { nullable: true })
	metaCounter: TotalCounter[];
}
