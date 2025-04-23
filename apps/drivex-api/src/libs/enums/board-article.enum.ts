import { registerEnumType } from '@nestjs/graphql';

export enum BoardArticleCategory {
	NEWS = 'NEWS',
	STORY = 'STORY',
	GENERAL = 'GENERAL',
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
