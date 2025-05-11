import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, isNotEmpty, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { CarType, CarMake, CarStatus, CarFuelType, CarTransmission } from '../../enums/car.enum';
import { ObjectId } from 'mongoose';

@InputType()
export class CarUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => CarType, { nullable: true })
	carType?: CarType;

	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;

	// @IsOptional()
	// @Field(() => CarLocation, { nullable: true })
	// carLocation?: CarLocation;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	carAddress?: string;

	@IsOptional()
	@Length(3, 100)
	@Field(() => String, { nullable: true })
	carTitle?: string;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	carPrice?: number;

	@IsOptional()
	@Field(() => Number, { nullable: true })
	carSquare?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Field(() => Int, { nullable: true })
	carBeds?: number;

	@IsOptional()
	@IsInt()
	@Min(1)
	@Field(() => Int, { nullable: true })
	carRooms?: number;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	carImages?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDesc?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	carBarter?: boolean;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	carRent?: boolean;

	soldAt?: Date;

	deletedAt?: Date;

	@IsOptional()
	@Field(() => Date, { nullable: true })
	constructedAt?: Date;
}
