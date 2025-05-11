import { registerEnumType } from '@nestjs/graphql';

export enum CarType {
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	TRUCK = 'TRUCK',
}
registerEnumType(CarType, {
	name: 'CarType',
});

export enum CarBrand {
	HYUNDAI = 'HYUNDAI',
	KIA = 'BUSAN',
	GENESIS = 'GENESIS',
	BMW = 'BMW',
	MERCEDES = 'MERCEDES',
	TOYOTA = 'TOYOTA',
	AUDI = 'AUDI',
	PORSCHE = 'PORSCHE',
	TESLA = 'TESLA',
	BYD = 'BYD',
}
registerEnumType(CarBrand, {
	name: 'CarBrand',
});

export enum CarStatus {
	ACTIVE = 'ACTIVE',
	SOLD = 'SOLD',
	DELETE = 'DELETE',
}
registerEnumType(CarStatus, {
	name: 'CarStatus',
});

export enum CarFuelType {
	PETROL = 'PETROL',
	ELECTRIC = 'ELECTRIC',
	HYBRID = 'HYBRID',
	// LPG = 'LPG'
	// DIESEL = 'DIESEL'
}
registerEnumType(CarFuelType, {
	name: 'CarFuelType',
});

export enum CarTransmission {
	AUTO = 'AUTO',
	MANUAL = 'MANUAL',
}
registerEnumType(CarTransmission, {
	name: 'CarTransmission',
});

export enum CarColor {
	WHITE = 'WHITE ',
	BLACK = 'BLACK ',
	GRAY = 'GRAY ',
	RED = 'RED ',
	BLUE = 'BLUE ',
	SILVER = 'SILVER ',
	// GREEN = 'GREEN',
	// ORANGE = 'ORANGE',
}
registerEnumType(CarColor, {
	name: 'CarColor',
});
