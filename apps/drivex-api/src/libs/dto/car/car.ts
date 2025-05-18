import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarColor } from '../../enums/car.enum';
import { Member, TotalCounter } from '../member/member';
import { MeLiked } from '../like/like';

@ObjectType()
export class Car {
	@Field(() => String)
	_id: ObjectId;

	@Field(() => CarStatus)
	carStatus: CarStatus;

	@Field(() => CarBrand)
	carBrand: CarBrand; // e.g. "Hyundai"

	@Field(() => String)
	carModel: string; // e.g. "Sonata"

	@Field(() => CarType)
	carType: CarType; // e.g. "Sedan"

	@Field(() => Number)
	carYear: number; // e.g. "2022"

	@Field(() => Number)
	carPrice: number; // e.g. "44000"

	@Field(() => CarFuelType)
	carFuelType: CarFuelType; // e.g. "Petrol"

	@Field(() => CarTransmission)
	carTransmission: CarTransmission; // e.g. "Auto"

	@Field(() => CarColor)
	carColor: CarColor; // e.g. "Black"

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
