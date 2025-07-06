import { Schema } from 'mongoose';
import { BoardArticleCategory, BoardArticleStatus } from '../libs/enums/board-article.enum';
import { generateSlug } from '../libs/utils/slugify.util';

const BoardArticleSchema = new Schema(
	{
		articleCategory: {
			type: String,
			enum: BoardArticleCategory,
			required: true,
		},

		articleStatus: {
			type: String,
			enum: BoardArticleStatus,
			default: BoardArticleStatus.ACTIVE,
		},

		articleTitle: {
			type: String,
			required: true,
		},

		articleContent: {
			type: String,
			required: true,
		},

		articleImage: {
			type: String,
		},

		articleLikes: {
			type: Number,
			default: 0,
		},

		articleViews: {
			type: Number,
			default: 0,
		},

		articleComments: {
			type: Number,
			default: 0,
		},

		articleSlug: {
			type: String,
			unique: true,
		},

		memberId: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: 'Member',
		},
	},
	{ timestamps: true, collection: 'boardArticles' },
);

// ✅ Slug generation hook
BoardArticleSchema.pre('save', function (next) {
	if (this.isModified('articleTitle') || !this.articleSlug) {
		const timestamp = Date.now(); // optional uniqueness
		this.articleSlug = generateSlug(this.articleTitle, timestamp.toString());
	}
	next();
});

export default BoardArticleSchema;
