import { registerEnumType } from '@nestjs/graphql';

// NOTIFICATION -> Bizga kelgan xabarlar
export enum NotificationType {
	LIKE = 'LIKE',
	COMMENT = 'COMMENT',
}
registerEnumType(NotificationType, {
	name: 'NotificationType',
});

export enum NotificationStatus {
	WAIT = 'WAIT',
	READ = 'READ',
}
registerEnumType(NotificationStatus, {
	name: 'NotificationStatus',
});

export enum NotificationGroup {
	MEMBER = 'MEMBER',
	ARTICLE = 'ARTICLE',
	CAR = 'CAR',
}
registerEnumType(NotificationGroup, {
	name: 'NotificationGroup',
});
