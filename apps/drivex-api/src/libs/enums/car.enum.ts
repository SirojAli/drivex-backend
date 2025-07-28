import { registerEnumType } from '@nestjs/graphql';

export enum CarStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(CarStatus, {
	name: 'CarStatus',
});

export enum CarBrand {
	KIA = 'KIA',
	HYUNDAI = 'HYUNDAI',
	GENESIS = 'GENESIS',
	BMW = 'BMW',
	MERCEDES = 'MERCEDES',
	TOYOTA = 'TOYOTA',
	AUDI = 'AUDI',
	LEXUS = 'LEXUS',
}
registerEnumType(CarBrand, {
	name: 'CarBrand',
});

export enum CarType {
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	HATCHBACK = 'HATCHBACK',
	CROSSOVER = 'CROSSOVER',
	COUPE = 'COUPE',
	CONVERTIBLE = 'CONVERTIBLE',
}
registerEnumType(CarType, {
	name: 'CarType',
});

export enum CarFuelType {
	PETROL = 'PETROL',
	ELECTRIC = 'ELECTRIC',
	HYBRID = 'HYBRID',
	LPG = 'LPG',
	DIESEL = 'DIESEL',
}
registerEnumType(CarFuelType, {
	name: 'CarFuelType',
});

export enum CarTransmission {
	MANUAL = 'MANUAL',
	AUTO = 'AUTO',
}
registerEnumType(CarTransmission, {
	name: 'CarTransmission',
});

export enum CarDriveType {
	FWD = 'FWD', // Front-Wheel Drive
	RWD = 'RWD', // Rear-Wheel Drive
	AWD = 'AWD', // All-Wheel Drive
	FOURWD = '4WD', // Four-Wheel Drive
}
registerEnumType(CarDriveType, {
	name: 'CarDriveType',
});
