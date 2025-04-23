import { Module } from '@nestjs/common';
import { DrivexBatchController } from './drivex-batch.controller';
import { DrivexBatchService } from './drivex-batch.service';

@Module({
  imports: [],
  controllers: [DrivexBatchController],
  providers: [DrivexBatchService],
})
export class DrivexBatchModule {}
