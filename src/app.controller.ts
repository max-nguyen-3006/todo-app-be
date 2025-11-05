import { Controller, Get } from '@nestjs/common';
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
}
