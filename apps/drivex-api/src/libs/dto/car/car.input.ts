import { Field, InputType, Int, Float } from '@nestjs/graphql';
import { IsIn, IsNotEmpty, IsOptional, Length, Min, Max, Matches, IsBoolean } from 'class-validator';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarDriveType } from '../../enums/car.enum';
import { ObjectId } from 'mongoose';
import { availableCarSorts } from '../../config';
import { Direction } from '../../enums/common.enum';

// CAR INPUT for Create/Update
@InputType()
export class CarInput {
	@IsNotEmpty()
	@Field(() => CarBrand)
	carBrand: CarBrand;

	@IsNotEmpty()
	@Length(1, 30)
	@Field(() => String)
	carModel: string;

	@IsNotEmpty()
	@Field(() => CarType)
	carType: CarType;

	@IsNotEmpty()
	@Field(() => Int)
	carYear: number;

	@IsNotEmpty()
	@Field(() => Int)
	carPrice: number;

	@IsNotEmpty()
	@Field(() => CarFuelType)
	carFuelType: CarFuelType;

	@IsNotEmpty()
	@Field(() => CarTransmission)
	carTransmission: CarTransmission;

	@IsNotEmpty()
	@Field(() => String)
	carColor: string;

	@IsNotEmpty()
	@Field(() => [String])
	carImages: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carVideoUrl?: string;

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDescription?: string;

	@IsNotEmpty()
	@Matches(/^[A-HJ-NPR-Z0-9]{17}$/, { message: 'Invalid VIN format' })
	@Field(() => String)
	carVinNumber: string;

	@IsNotEmpty()
	@IsBoolean()
	@Field(() => Boolean)
	carIsNew: boolean;

	@IsNotEmpty()
	@Field(() => Float)
	@Min(0)
	carEngineSize: number;

	@IsNotEmpty()
	@Field(() => Int)
	@Min(0)
	carMaxSpeed: number;

	@IsNotEmpty()
	@Field(() => Int)
	@Min(1)
	carSeats: number;

	@IsNotEmpty()
	@Field(() => Int)
	@Min(1)
	carDoors: number;

	@IsNotEmpty()
	@Field(() => Int)
	@Min(0)
	carCityMpg: number;

	@IsNotEmpty()
	@Field(() => Int)
	@Min(0)
	carHighwayMpg: number;

	@IsNotEmpty()
	@Field(() => Int)
	@Min(1)
	carCylinders: number;

	@IsNotEmpty()
	@Field(() => CarDriveType)
	carDriveType: CarDriveType;

	memberId?: ObjectId;
}

// RANGES
@InputType()
export class PricesRange {
	@Field(() => Int)
	min: number;

	@Field(() => Int)
	max: number;
}

@InputType()
export class YearRange {
	@Field(() => Int)
	min: number;

	@Field(() => Int)
	max: number;
}

@InputType()
export class CarMinSpecs {
	@Field(() => Int, { nullable: true })
	minSeats?: number;

	@Field(() => Int, { nullable: true })
	minDoors?: number;

	@Field(() => Int, { nullable: true })
	minCylinders?: number;

	@Field(() => Float, { nullable: true })
	minEngineSize?: number;

	@Field(() => Int, { nullable: true })
	minCityMpg?: number;

	@Field(() => Int, { nullable: true })
	minHighwayMpg?: number;

	@Field(() => Int, { nullable: true })
	minMaxSpeed?: number;
}

// SEARCH FILTERS (Car Inquiry Search)
@InputType()
export class CarISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [CarStatus], { nullable: true })
	carStatus?: CarStatus[];

	@IsOptional()
	@Field(() => [CarBrand], { nullable: true })
	brandList?: CarBrand[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	carModel?: string;

	@IsOptional()
	@Field(() => [CarType], { nullable: true })
	typeList?: CarType[];

	@IsOptional()
	@Field(() => YearRange, { nullable: true })
	carYear?: YearRange;

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	carPrice?: PricesRange;

	@IsOptional()
	@Field(() => [CarFuelType], { nullable: true })
	fuelTypeList?: CarFuelType[];

	@IsOptional()
	@Field(() => [CarTransmission], { nullable: true })
	transmissionList?: CarTransmission[];

	@IsOptional()
	@Field(() => [CarDriveType], { nullable: true })
	driveTypeList?: CarDriveType[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	colorList?: string;

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	seatsList?: number[];

	@IsOptional()
	@Field(() => [Int], { nullable: true })
	doorsList?: number[];

	@IsOptional()
	@Field(() => [Float], { nullable: true })
	engineSizeList?: number[];

	@IsOptional()
	@Length(2, 100)
	@Field(() => String, { nullable: true })
	text?: string;
}

// CAR LISTING QUERY (Cars Inquiry)
@InputType()
export class CarsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableCarSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => CarISearch)
	search: CarISearch;
}

// 5. SELLER CARS INQUIRY
@InputType()
class SCISearch {
	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;

	@IsOptional()
	@Field(() => [CarBrand], { nullable: true })
	carBrand?: CarBrand[];

	@IsOptional()
	@Field(() => [CarType], { nullable: true })
	carType?: CarType[];

	@IsOptional()
	@Field(() => [CarFuelType], { nullable: true })
	carFuelType?: CarFuelType[];

	@IsOptional()
	@Field(() => [CarTransmission], { nullable: true })
	carTransmission?: CarTransmission[];

	@IsOptional()
	@Field(() => String, { nullable: true })
	carColor?: string;

	@IsOptional()
	@Field(() => Boolean, { nullable: true })
	carIsNew?: boolean;

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	carPrice?: PricesRange;

	@IsOptional()
	@Field(() => Int, { nullable: true })
	carYear?: number;

	@IsOptional()
	@Field(() => String, { nullable: true })
	text?: string;
}

@InputType()
export class SellerCarsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableCarSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => SCISearch)
	search: SCISearch;
}

// 6. ALL CARS INQUIRY
@InputType()
class ALCISearch {
	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;

	@IsOptional()
	@Field(() => [CarBrand], { nullable: true })
	carBrandList?: CarBrand[];
}

@InputType()
export class AllCarsInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;

	@IsOptional()
	@IsIn(availableCarSorts)
	@Field(() => String, { nullable: true })
	sort?: string;

	@IsOptional()
	@Field(() => Direction, { nullable: true })
	direction?: Direction;

	@IsNotEmpty()
	@Field(() => ALCISearch)
	search: ALCISearch;
}

// 7. For Favorite Cars
@InputType()
export class OrdinaryInquiry {
	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	page: number;

	@IsNotEmpty()
	@Min(1)
	@Field(() => Int)
	limit: number;
}
