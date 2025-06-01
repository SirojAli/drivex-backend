import { Controller, Get } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_CARS, BATCH_TOP_SELLERS } from './lib/config';

@Controller()
export class BatchController {
	private logger: Logger = new Logger('SocketEventsGateway');
	constructor(private readonly batchService: BatchService) {}

	@Timeout(1000)
	handleTimeout() {
		this.logger.debug('BATCH SERVER READY');
	}

	// @Cron('00 * * * * *', { name: BATCH_ROLLBACK }) // every 00:00 seconds
	@Cron('00 00 01 * * *', { name: BATCH_ROLLBACK }) // start: 1:00 am (in 24h)
	public async batchRollback() {
		try {
			this.logger['context'] = BATCH_ROLLBACK;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchRollback();
		} catch (err) {
			this.logger.error(err);
		}
	}

	// @Cron('20 * * * * *', { name: BATCH_TOP_CARS }) // every 00:20 seconds
	@Cron('20 00 01 * * *', { name: BATCH_TOP_CARS }) // start: 01:00 am 20 sec (in 24h)
	public async batchTopCars() {
		try {
			this.logger['context'] = BATCH_TOP_CARS;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchTopCars();
		} catch (err) {
			this.logger.error(err);
		}
	}

	// @Cron('40 * * * * *', { name: BATCH_TOP_SELLERS }) // every 00:40 seconds
	@Cron('40 00 01 * * *', { name: BATCH_TOP_SELLERS }) // start: 01:00 am 40 sec (in 24h)
	public async batchTopSeller() {
		try {
			this.logger['context'] = BATCH_TOP_SELLERS;
			this.logger.debug('EXECUTED!');
			await this.batchService.batchTopSeller();
		} catch (err) {
			this.logger.error(err);
		}
	}

	/*
  @Interval(1000)
  handleInterval() {
    this.logger.debug('INTERVAL TEST');
  }
  */

	@Get()
	getHello(): string {
		return this.batchService.getHello();
	}
}
