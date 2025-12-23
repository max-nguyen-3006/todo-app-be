import { Controller, Get, Res } from '@nestjs/common';

import { MetricsService } from './metrics.service';
import * as client from 'prom-client';
import type { Response } from 'express';

@Controller()
export class MetricsController {
    constructor(private readonly metricsService: MetricsService) { }

    @Get('/metrics')
    async metrics(@Res() res: Response) {
        res.set('Content-Type', client.register.contentType);
        res.send(await this.metricsService.getMetrics());
    }
}
