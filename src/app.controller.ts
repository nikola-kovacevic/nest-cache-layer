import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/clear-cache')
  clearCache(): Promise<unknown> {
    return this.appService.clearCache();
  }

  @Get('/item/:id')
  findOne(@Param() params): Promise<unknown> {
    return this.appService.get(params.id);
  }

  @Get('/slow-item/:id')
  findOneSlow(@Param() params): Promise<unknown> {
    return this.appService.slowGet(params.id);
  }

  @Get('/slow-ttl-item/:id')
  findOneSlowWithTTL(@Param() params): Promise<unknown> {
    return this.appService.slowGetWithTTL(params.id);
  }
}
