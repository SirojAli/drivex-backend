import { Schema } from 'mongoose';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarDriveType } from '../libs/enums/car.enum';
import { generateSlug } from '../libs/utils/slugify.util';

const CarSchema = new Schema(
	{
		carStatus: {
			type: String,
			enum: CarStatus,
			default: CarStatus.ACTIVE,
		},

		carBrand: {
			type: String,
			enum: CarBrand,
			required: true,
		},

		carModel: {
			type: String,
			required: true,
		},

		carType: {
			type: String,
			enum: CarType,
			required: true,
		},

		carYear: {
			type: Number,
			required: true,
		},

		carPrice: {
			type: Number,
			required: true,
			min: 0,
		},

		carFuelType: {
			type: String,
			enum: CarFuelType,
			required: true,
		},

		carTransmission: {
			type: String,
			enum: CarTransmission,
			default: CarTransmission.AUTO,
			required: true,
		},

		carColor: {
			type: String,
			required: true,
		},

		carImages: {
			type: [String],
			required: true,
		},

		carVideoUrl: {
			type: String,
			default: '',
		},

		carDescription: {
			type: String,
		},

		carComments: {
			type: Number,
			default: 0,
		},

		carRank: {
			type: Number,
			default: 0,
		},

		carLikes: {
			type: Number,
			default: 0,
		},

		carViews: {
			type: Number,
			default: 0,
		},

		carVinNumber: {
			type: String,
			required: true,
			unique: true,
			match: /^[A-HJ-NPR-Z0-9]{17}$/, // Standard VIN format
		},

		carIsNew: {
			type: Boolean,
			required: true,
		},

		carEngineSize: {
			type: Number,
			required: true,
			min: 0,
		},

		carMaxSpeed: {
			type: Number,
			required: true,
			min: 0,
		},

		carSeats: {
			type: Number,
			required: true,
			min: 1,
		},

		carDoors: {
			type: Number,
			required: true,
			min: 1,
		},

		carCityMpg: {
			type: Number,
			required: true,
			min: 0,
		},

		carHighwayMpg: {
			type: Number,
			required: true,
			min: 0,
		},

		carCylinders: {
			type: Number,
			required: true,
			min: 1,
		},

		carDriveType: {
			type: String,
			enum: CarDriveType,
			required: true,
		},

		carSlug: {
			type: String,
			unique: true,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},

		soldAt: {
			type: Date,
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'cars' },
);

// Goal: Seller can't list (create) the same car twice
// It's compound-index. Those data should be unique at the same time
CarSchema.index(
	{
		carBrand: 1,
		carModel: 1,
		carYear: 1,
		carPrice: 1,
		memberId: 1, // Remove, If needed
	},
	{ unique: true },
);

// Slug generation hook for car model
CarSchema.pre('save', function (next) {
	// Only generate slug if carModel changed or carSlug doesn't exist
	if (this.isModified('carModel') || !this.carSlug) {
		// Combine brand, model, and year for uniqueness
		const baseString = `${this.carBrand} ${this.carModel} ${this.carYear}`;
		const timestamp = Date.now(); // optional, for uniqueness
		this.carSlug = generateSlug(baseString, timestamp.toString());
	}
	next();
});

export default CarSchema;
