import { Controller, Get } from '@nestjs/common';
import { DrivexBatchService } from './drivex-batch.service';

@Controller()
export class DrivexBatchController {
  constructor(private readonly drivexBatchService: DrivexBatchService) {}

  @Get()
  getHello(): string {
    return this.drivexBatchService.getHello();
  }
}
