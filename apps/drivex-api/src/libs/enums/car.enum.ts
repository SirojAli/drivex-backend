import { registerEnumType } from '@nestjs/graphql';

export enum CarType {
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	TRUCK = 'TRUCK',
}
registerEnumType(CarType, {
	name: 'CarType',
});

export enum CarMake {
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
registerEnumType(CarMake, {
	name: 'CarMake',
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
