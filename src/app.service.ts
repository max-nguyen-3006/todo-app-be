import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const nodeEnv = process.env.NODE_ENV || '';
    return `DDM2 Team says Hello from NestJS! (Environment: ${nodeEnv})`;

  }
}
