import { NestFactory } from '@nestjs/core';
import { DrivexBatchModule } from './drivex-batch.module';

async function bootstrap() {
  const app = await NestFactory.create(DrivexBatchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
