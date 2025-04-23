import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { BoardArticleModule } from './board-article/board-article.module';
// import { CommentModule } from './comment/comment.module';
// import { FollowModule } from './follow/follow.module';
// import { LikeModule } from './like/like.module';
// import { MemberModule } from './member/member.module';
// import { CarModule } from './car/car.module';
// import { ViewModule } from './view/view.module';

@Module({
	imports: [
		AuthModule,
		// BoardArticleModule,
		// CommentModule,
		// FollowModule,
		// LikeModule,
		// MemberModule,
		// CarModule,
		// ViewModule,
	],
})
export class ComponentsModule {}
