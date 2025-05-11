import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarColor } from '../../enums/car.enum';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';

@ObjectType()
export class Car {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => CarType)
	carType: CarType;

	@Field(() => CarStatus)
	carStatus: CarStatus;

	@Field(() => CarBrand)
	carBrand: CarBrand;

	@Field(() => String)
	carModel: string;

	@Field(() => String)
	carAddress: string;

	@Field(() => String)
	carTitle: string;

	@Field(() => Number)
	carYear: number;

	@Field(() => Number)
	carPrice: number;

	// @Field(() => Number)
	// carMileage: number;

	@Field(() => CarFuelType)
	carFuelType: CarFuelType;

	@Field(() => CarTransmission)
	carTransmission: CarTransmission;

	@Field(() => CarColor)
	carColor: CarColor;

	@Field(() => [String])
	carImages: string[];

	@Field(() => String, { nullable: true })
	carDescription?: string;

	@Field(() => Int)
	carComments: number;

	@Field(() => Int)
	carRank: number;

	@Field(() => Int)
	carViews: number;

	@Field(() => Int)
	carLikes: number;

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
