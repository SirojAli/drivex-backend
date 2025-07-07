import { Field, InputType, Int } from '@nestjs/graphql';
import { IsBoolean, IsIn, IsInt, IsNotEmpty, IsOptional, Length, Matches, Min } from 'class-validator';
import { CarBrand, CarDriveType, CarFuelType, CarStatus, CarTransmission, CarType } from '../../enums/car.enum';
import { ObjectId } from 'mongoose';

@InputType()
export class CarUpdate {
	@IsNotEmpty()
	@Field(() => String)
	_id: ObjectId;

	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;

	@IsOptional()
	@Field(() => CarBrand, { nullable: true })
	carBrand?: CarBrand;

	@IsOptional()
	@Length(1, 50)
	@Field(() => String, { nullable: true })
	carModel?: string;

	@IsOptional()
	@Field(() => CarType, { nullable: true })
	carType?: CarType;

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
	@Field(() => String, { nullable: true })
	carColor?: string;

	@IsOptional()
	@Field(() => [String], { nullable: true })
	carImages?: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDescription?: string;

	@IsOptional()
	@Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid VIN format' })
	@Field(() => String, { nullable: true })
	carVinNumber?: string;

	@IsOptional()
	@IsBoolean()
	@Field(() => Boolean, { nullable: true })
	carIsNew?: boolean;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(0)
	carEngineSize?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(0)
	carMaxSpeed?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(1)
	carSeats?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(1)
	carDoors?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(0)
	carCityMpg?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(0)
	carHighwayMpg?: number;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	@Min(1)
	carCylinders?: number;

	@IsOptional()
	@Field(() => CarDriveType, { nullable: true })
	carDriveType?: CarDriveType;

	soldAt?: Date;

	deletedAt?: Date;
}
