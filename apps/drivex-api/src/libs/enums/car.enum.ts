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
	PORSCHE = 'PORSCHE',
	TESLA = 'TESLA',
	BYD = 'BYD',
	LEXUS = 'LEXUS',
	ROLLS_ROYCE = 'ROLLS_ROYCE',
	FERRARI = 'FERRARI',
	LAMBORGHINI = 'LAMBORGHINI',
	BUGATTI = 'BUGATTI',
}
registerEnumType(CarBrand, {
	name: 'CarBrand',
});

export enum CarType {
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	TRUCK = 'TRUCK',
	COUPE = 'COUPE',
	CONVERTIBLE = 'CONVERTIBLE',
	HATCHBACK = 'HATCHBACK',
	MINIVAN = 'MINIVAN',
	PICKUP = 'PICKUP',
	CROSSOVER = 'CROSSOVER',
	WAGON = 'WAGON',
	MPV = 'MPV', // Multi-Purpose Vehicle
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
	SEMI_AUTO = 'SEMI_AUTO',
}
registerEnumType(CarTransmission, {
	name: 'CarTransmission',
});

export enum CarColor {
	BLACK = 'BLACK',
	WHITE = 'WHITE',
	SILVER = 'SILVER',
	GREY = 'GREY',
	BLUE = 'BLUE',
	RED = 'RED',
	GREEN = 'GREEN',
	YELLOW = 'YELLOW',
	ORANGE = 'ORANGE',
	BROWN = 'BROWN',
	GOLD = 'GOLD',
	PURPLE = 'PURPLE',
}
registerEnumType(CarColor, {
	name: 'CarColor',
});
