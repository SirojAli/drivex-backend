import { Injectable } from '@nestjs/common';

@Injectable()
export class DrivexBatchService {
  getHello(): string {
    return 'Hello to DRIVEX BATCH Server!';
  }
}
