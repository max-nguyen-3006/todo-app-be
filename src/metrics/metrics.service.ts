import { Injectable } from '@nestjs/common';
import * as client from 'prom-client';

@Injectable()
export class MetricsService {
  private readonly httpRequestDuration;

  constructor() {
    client.collectDefaultMetrics();

    this.httpRequestDuration = new client.Histogram({
      name: 'http_request_duration_seconds',
      help: 'HTTP request duration',
      labelNames: ['method', 'route', 'status_code'],
      buckets: [0.1, 0.3, 0.5, 1, 1.5, 2, 5],
    });
  }

  observeRequest(method: string, route: string, status: number, duration: number) {
    this.httpRequestDuration
      .labels(method, route, status.toString())
      .observe(duration);
  }

  async getMetrics() {
    return client.register.metrics();
  }
}
