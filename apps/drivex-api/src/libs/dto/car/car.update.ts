import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { CarBrand, CarColor, CarFuelType, CarStatus, CarTransmission, CarType } from '../../enums/car.enum';
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

	@IsOptional()
	@Field(() => CarBrand, { nullable: true })
	carBrand?: CarBrand;

	@IsOptional()
	@Length(1, 100)
	@Field(() => String, { nullable: true })
	carModel?: string;

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
	carYear?: number;

	@IsOptional()
	@Min(0)
	@Field(() => Number, { nullable: true })
	carPrice?: number;

	@IsOptional()
	@Field(() => CarFuelType, { nullable: true })
	carFuelType?: CarFuelType;

	@IsOptional()
	@Field(() => CarTransmission, { nullable: true })
	carTransmission?: CarTransmission;

	@IsOptional()
	@Field(() => CarColor, { nullable: true })
	carColor?: CarColor;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	carImages?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDescription?: string;

	soldAt?: Date;

	deletedAt?: Date;
}
