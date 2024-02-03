import { Controller, Get } from '@nestjs/common';
import * as t from '@nestjs/terminus';
import { AppService } from '@github.com/pavhov/price-oracle-service-task/price-oracle/app.service';

@Controller()
export class AppController {
  private readonly url: string;
  constructor(
    private readonly appService: AppService,
    private readonly health: t.HealthCheckService,

    private readonly db: t.MongooseHealthIndicator,
    private readonly disk: t.DiskHealthIndicator,
    private readonly memory: t.MemoryHealthIndicator,
  ) {
    this.url = process.env.URL;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @t.HealthCheck()
  @Get('health')
  check() {
    return this.health.check([
      () => this.db.pingCheck('mongodb', { timeout: 1500 }),
      () =>
        this.disk.checkStorage('storage', { path: '/', thresholdPercent: 0.5 }),
      () => this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
      () => this.memory.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }
}
