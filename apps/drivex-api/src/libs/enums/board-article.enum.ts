import { registerEnumType } from '@nestjs/graphql';

export enum BoardArticleCategory {
	NEWS = 'NEWS',
	REVIEWS = 'REVIEWS ',
	EVENT = 'EVENT',
	GUIDE = 'GUIDE ',
	PROMOTION = 'PROMOTION',
	ANNOUNCEMENT = 'ANNOUNCEMENT ',
}
registerEnumType(BoardArticleCategory, {
	name: 'BoardArticleCategory',
});

export enum BoardArticleStatus {
	ACTIVE = 'ACTIVE',
	DELETE = 'DELETE',
}
registerEnumType(BoardArticleStatus, {
	name: 'BoardArticleStatus',
});
