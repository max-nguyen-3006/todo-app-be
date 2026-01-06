import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('cpu')
  generateCpuLoad(): string {
    const end = Date.now() + 10000;
    while (Date.now() < end) {
      Math.sqrt(Math.random());
    }
    return 'CPU load generated for 10 seconds!';
  }

  @Get('ram')
  generateRamLoad(
    @Query('mb') mb?: string,
    @Query('durationSec') durationSec?: string,
  ): string {
    const requestedMb = Number.parseInt(mb ?? '256', 10);
    const requestedDurationSec = Number.parseInt(durationSec ?? '10', 10);

    const targetMb = Number.isFinite(requestedMb)
      ? Math.min(Math.max(requestedMb, 1), 2048)
      : 256;
    const seconds = Number.isFinite(requestedDurationSec)
      ? Math.min(Math.max(requestedDurationSec, 1), 300)
      : 10;

    const buffers: Buffer[] = [];
    for (let i = 0; i < targetMb; i += 1) {
      buffers.push(Buffer.alloc(1024 * 1024, 1));
    }

    const end = Date.now() + seconds * 1000;
    while (Date.now() < end) {
      // Touch a few buffers so memory stays hot.
      const index = (Date.now() / 13) | 0;
      const buf = buffers[index % buffers.length];
      buf[0] = (buf[0] + 1) & 0xff;
    }

    buffers.length = 0;
    return `RAM load generated: ~${targetMb}MB for ${seconds}s`;
  }
}
