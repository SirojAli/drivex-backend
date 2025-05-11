import { Schema } from 'mongoose';
import { CarType, CarMake, CarStatus, CarFuelType, CarTransmission } from '../libs/enums/car.enum';

const CarSchema = new Schema(
	{
		carType: {
			type: String,
			enum: CarType,
			required: true,
		},

		// forgot to add 'carStatus' in ER Modeling
		carStatus: {
			type: String,
			enum: CarStatus,
			default: CarStatus.ACTIVE,
		},

		carMake: {
			type: String,
			enum: CarMake,
			required: true,
		},

		carModel: {
			type: String,
			required: true,
		},

		// forgot to add 'carAddress' in ER Modeling
		carAddress: {
			type: String,
			required: true,
		},

		carTitle: {
			type: String,
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

		carMileage: {
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

		// Remove carRent and carBarter (written in ER Modeling)

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

		constructedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'cars' },
);

// Goal: Seller can't list (create) the same car twice
// Bu compound-index. Bu beshta ma'lumot -> bir vaqtda unique b-i kk
CarSchema.index(
	{
		carMake: 1,
		carModel: 1,
		carYear: 1,
		carPrice: 1,
		memberId: 1,
	},
	{ unique: true },
);

export default CarSchema;
