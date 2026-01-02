import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const nodeEnv = process.env.NODE_ENV || '';
    return `DDM Team says Hello from NestJS! (Environment: ${nodeEnv})`;

  }
}
