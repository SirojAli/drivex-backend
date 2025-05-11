// Bu enumlarni graphQL da ham ishlatishimiz kk, LEKIN bularni
// to'g'ridan-to'g'ri graphQL ishlatolmaganimiz uchun:
// <@nestjs/graphql> ichidan ENUMlarni ro'yxatga oladigan
// 'registerEnumType' ni chaqirib olamiz

import { registerEnumType } from '@nestjs/graphql';

export enum MemberType {
	ADMIN = 'ADMIN',
	USER = 'USER',
	SELLER = 'SELLER', // Agent emas, SELLER qildim => mashina oldi-sotdisi uchun
}
registerEnumType(MemberType, { name: 'MemberType' });
// 'registerEnumType' orqali, biz TS da hosil qilgan enumlarni
// GraphQL da ishlatishimiz u-n, bularni shunday ro'yxatga olamiz
// Endi bu enumlarni GraphQL da ishlata olamiz !!!

export enum MemberStatus {
	ACTIVE = 'ACTIVE',
	BLOCK = 'BLOCK',
	DELETE = 'DELETE',
}
registerEnumType(MemberStatus, { name: 'MemberStatus' });

// Authentication usullari tel-email-tg orqali amalga oshirsa bo'ladi FAQAT!
export enum MemberAuthType {
	PHONE = 'PHONE',
	EMAIL = 'EMAIL',
	TELEGRAM = 'TELEGRAM',
}
registerEnumType(MemberAuthType, { name: 'MemberAuthType' });
