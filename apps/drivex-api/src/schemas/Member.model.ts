import { Schema } from 'mongoose';
import { MemberType, MemberStatus, MemberAuthType } from '../libs/enums/member.enum';

// Mongoosedan qabul qilingan Schema orqali yangi instance yaratib olamiz: MemberSchema
// Ichidagi hamma DATASET lar ER Modelingda yozilgan va ular asosida yozilyapti

const MemberSchema = new Schema(
	{
		// Bu yerda yozilganlarning barchasi -> DATA SET lar (memberType, memberStatus...)
		memberType: {
			type: String,
			enum: MemberType,
			default: MemberType.USER,
			// required: false,
			// required qo'yilmagan b-a, by-default FALSE qiymatini oladi
			// shuning chun yozilmaydi !!!
		},

		memberStatus: {
			type: String,
			enum: MemberStatus,
			default: MemberStatus.ACTIVE,
		},

		memberAuthType: {
			type: String,
			enum: MemberAuthType,
			default: MemberAuthType.PHONE,
		},

		memberPhone: {
			type: String,
			index: { unique: true, sparse: true }, // phone - unique b-i kk
			required: true,
			// talab qilinsa: <required: true> ni  yozish shart
		},

		memberPassword: {
			type: String,
			select: false, // ma'nosi: by-default password qiymatini olib bermasin!
			required: true,
		},

		memberNick: {
			type: String,
			index: { unique: true, sparse: true },
			required: true,
		},

		memberFullName: {
			type: String,
			// bu OPTIONAL bo'lgani uchun, boshqa mantiqlarni yozmaymiz.
		},

		memberImage: {
			type: String,
			default: '',
		},

		memberAddress: {
			type: String,
		},

		memberDescription: {
			type: String,
		},

		// Pastdagi DATA-SET lar default: 0 b-i kk,
		// sababi bular minus(-) sonlardan boshlanmaydi
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

		deletedAt: {
			type: Date,
		},
	},
	// ER Modelingda yozgan: createdAt va updatedAt real-time da b-i uchun
	// timestamps: true qilishimiz kk
	// collection imiz: <members> bo'ladi
	{ timestamps: true, collection: 'members' },
);

// <MemberSchema> ni export qil -> boshqa logic larda ishlatish uchun!
export default MemberSchema;

// QOLGAN SCHEMA MODEL LAR HAM XUDDI SHUNDAY YARATILADI !
// SO -> QOLGANLARIDA BUNDAY TO'LIQ COMMENTS YOZILMAYDI !
// KK BO'LSAGINA YOZILADI !
