import { Schema } from 'mongoose';
import { MemberType, MemberStatus, MemberAuthType } from '../libs/enums/member.enum';
import slugify from 'slugify';

const MemberSchema = new Schema(
	{
		memberType: {
			type: String,
			enum: MemberType,
			default: MemberType.USER,
		},

		memberStatus: {
			type: String,
			enum: MemberStatus,
			default: MemberStatus.ACTIVE,
		},

		memberAuthType: {
			type: String,
			enum: MemberAuthType,
			default: MemberAuthType.EMAIL,
		},

		memberEmail: {
			type: String,
			index: { unique: true },
			required: true,
		},

		memberPhone: {
			type: String,
			default: null,
		},

		memberPassword: {
			type: String,
			select: false,
			required: true,
		},

		memberNick: {
			type: String,
			index: { unique: true, sparse: true },
			required: true,
		},

		memberFullName: {
			type: String,
		},

		memberImage: {
			type: String,
			default: '',
		},

		memberVideoUrl: {
			type: String,
			default: '', // URL to video links
		},

		memberAddress: {
			type: String,
		},

		memberDescription: {
			type: String,
		},

		memberCars: {
			type: Number,
			default: 0,
		},

		memberArticles: {
			type: Number,
			default: 0,
		},

		memberFollowers: {
			type: Number,
			default: 0,
		},

		memberFollowings: {
			type: Number,
			default: 0,
		},

		memberPoints: {
			type: Number,
			default: 0,
		},

		memberLikes: {
			type: Number,
			default: 0,
		},

		memberViews: {
			type: Number,
			default: 0,
		},

		memberComments: {
			type: Number,
			default: 0,
		},

		memberRank: {
			type: Number,
			default: 0,
		},

		memberWarnings: {
			type: Number,
			default: 0,
		},

		memberBlocks: {
			type: Number,
			default: 0,
		},

		brandSlug: {
			type: String,
			unique: true,
			sparse: true,
		},

		deletedAt: {
			type: Date,
		},
	},
	{ timestamps: true, collection: 'members' },
);

// Generate brandSlug from memberNick for sellers before saving
MemberSchema.pre('save', function (next) {
	if (this.memberType === MemberType.SELLER && (this.isModified('memberNick') || !this.brandSlug)) {
		const timestamp = Date.now();
		this.brandSlug = slugify(this.memberNick, { lower: true, strict: true }) + '-' + timestamp;
	}
	next();
});

export default MemberSchema;
