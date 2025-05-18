import { Schema } from 'mongoose';
import { CarType, CarBrand, CarStatus, CarFuelType, CarTransmission, CarColor } from '../libs/enums/car.enum';

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
			enum: CarColor,
			required: true,
		},

		carImages: {
			type: [String],
			required: true,
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
		// memberId: 1, -> Add if need it
	},
	{ unique: true },
);

export default CarSchema;
