import { Test, TestingModule } from '@nestjs/testing';
import { DrivexBatchController } from './drivex-batch.controller';
import { DrivexBatchService } from './drivex-batch.service';

describe('DrivexBatchController', () => {
  let drivexBatchController: DrivexBatchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DrivexBatchController],
      providers: [DrivexBatchService],
    }).compile();

    drivexBatchController = app.get<DrivexBatchController>(DrivexBatchController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(drivexBatchController.getHello()).toBe('Hello World!');
    });
  });
});
