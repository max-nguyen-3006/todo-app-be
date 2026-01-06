import { Controller, Get, InternalServerErrorException, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('cpu')
  generateCpuLoad(): string {
    console.log("---- CPU load started for 10 seconds ----");
    const end = Date.now() + 10000;
    while (Date.now() < end) {
      Math.sqrt(Math.random());
    }
    console.log("---- CPU load ended ----");
    return 'CPU load generated for 10 seconds!';
  }

  @Get('ram')
  generateRamLoad(
    @Query('mb') mb?: string,
    @Query('durationSec') durationSec?: string,
  ): string {
    // Default is intentionally modest so /ram works even on small containers.
    const requestedMb = Number.parseInt(mb ?? '64', 10);
    const requestedDurationSec = Number.parseInt(durationSec ?? '10', 10);

    const targetMb = Number.isFinite(requestedMb)
      ? Math.min(Math.max(requestedMb, 1), 2048)
      : 256;
    const seconds = Number.isFinite(requestedDurationSec)
      ? Math.min(Math.max(requestedDurationSec, 1), 300)
      : 10;
    console.log("--- Generating RAM load:", { targetMb, seconds });
    console.log('[ram] start', {
      requestedMb: mb,
      requestedDurationSec: durationSec,
      targetMb,
      seconds,
      memoryUsage: process.memoryUsage(),
    });

    const buffers: Buffer[] = [];
    try {
      for (let i = 0; i < targetMb; i += 1) {
        buffers.push(Buffer.alloc(1024 * 1024, 1));
      }
      console.log('[ram] allocated', {
        targetMb,
        buffers: buffers.length,
        memoryUsage: process.memoryUsage(),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log('[ram] allocation_failed', {
        targetMb,
        error: message,
        memoryUsage: process.memoryUsage(),
      });
      throw new InternalServerErrorException(
        `RAM load allocation failed for ~${targetMb}MB. Try smaller 'mb'. Error: ${message}`,
      );
    }

    const end = Date.now() + seconds * 1000;
    while (Date.now() < end) {
      // Touch a few buffers so memory stays hot.
      const index = Math.floor(Date.now() / 13);
      const buf = buffers[index % buffers.length];
      buf[0] = (buf[0] + 1) & 0xff;
    }

    buffers.length = 0;
    console.log("--- RAM load ended ---")
    console.log('[ram] done', {
      targetMb,
      seconds,
      memoryUsage: process.memoryUsage(),
    });
    return `RAM load generated: ~${targetMb}MB for ${seconds}s`;
  }
}
