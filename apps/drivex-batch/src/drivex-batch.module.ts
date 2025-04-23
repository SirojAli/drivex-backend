import { Module } from '@nestjs/common';
import { DrivexBatchController } from './drivex-batch.controller';
import { DrivexBatchService } from './drivex-batch.service';
import { ConfigModule } from '@nestjs/config';

@Module({
	imports: [ConfigModule.forRoot()],
	controllers: [DrivexBatchController],
	providers: [DrivexBatchService],
})
export class DrivexBatchModule {}
