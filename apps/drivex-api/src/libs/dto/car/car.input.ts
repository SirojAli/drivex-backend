import { Field, InputType, Int } from '@nestjs/graphql';
import { IsIn, IsInt, isNotEmpty, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarColor } from '../../enums/car.enum';
import { ObjectId } from 'mongoose';
import { availableCarSorts } from '../../config';
import { Direction } from '../../enums/common.enum';

// 1. CAR INPUT
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
	@Field(() => Number)
	carYear: number;

	@IsNotEmpty()
	@Field(() => Number)
	carPrice: number;

	@IsNotEmpty()
	@Field(() => CarFuelType)
	carFuelType: CarFuelType;

	@IsNotEmpty()
	@Field(() => CarTransmission)
	carTransmission: CarTransmission;

	@IsNotEmpty()
	@Field(() => CarColor)
	carColor: CarColor;

	@IsNotEmpty()
	@Field(() => [String])
	carImages: string[];

	@IsOptional()
	@Length(5, 500)
	@Field(() => String, { nullable: true })
	carDescription?: string;

	memberId?: ObjectId;
}

// 2. RANGE TYPES
@InputType()
export class YearRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

@InputType()
export class PricesRange {
	@Field(() => Int)
	start: number;

	@Field(() => Int)
	end: number;
}

// 3. SEARCH FILTERS  (Car Inquiry Search)
@InputType()
class CISearch {
	@IsOptional()
	@Field(() => String, { nullable: true })
	memberId?: ObjectId;

	@IsOptional()
	@Field(() => [CarType], { nullable: true })
	typeList?: CarType[];

	@IsOptional()
	@Field(() => [CarBrand], { nullable: true })
	brandList?: CarBrand[];

	@IsOptional()
	@Field(() => [CarFuelType], { nullable: true })
	fuelList?: CarFuelType[];

	@IsOptional()
	@Field(() => [CarTransmission], { nullable: true })
	transmissionList?: CarTransmission[];

	@IsOptional()
	@Field(() => [CarColor], { nullable: true })
	colorList?: CarColor[];

	@IsOptional()
	@Field(() => PricesRange, { nullable: true })
	pricesRange?: PricesRange;

	@IsOptional()
	@Field(() => YearRange, { nullable: true })
	yearRange?: YearRange;

	@IsOptional()
	@Length(2, 100)
	@Field(() => String, { nullable: true })
	text?: string;
}

// 4. CAR LISTING QUERY  (Cars Inquiry)
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
	@Field(() => CISearch)
	search: CISearch;
}

// 5. SELLER CARS INQUIRY
@InputType()
class SPISearch {
	@IsOptional()
	@Field(() => CarStatus, { nullable: true })
	carStatus?: CarStatus;
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
	@Field(() => SPISearch)
	search: SPISearch;
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
