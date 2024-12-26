import { Controller, Get } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  MicroserviceHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  private readonly health: HealthCheckService;

  private readonly microserviceHealthIndicator: MicroserviceHealthIndicator;

  @Get()
  @HealthCheck()
  public async check() {
    return this.health.check([
      () =>
        this.microserviceHealthIndicator.pingCheck('kafka', {
          timeout: 6000,
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'profiles',
              brokers: [process.env.KAFKA_BROKER_URL ?? 'localhost:9094'],
            },
          },
        }),
    ]);
  }

  public constructor(
    health: HealthCheckService,
    microserviceHealthIndicator: MicroserviceHealthIndicator,
  ) {
    this.health = health;
    this.microserviceHealthIndicator = microserviceHealthIndicator;
  }
}
