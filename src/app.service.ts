import { Injectable } from '@nestjs/common';

import { RedisCacheService } from './services/cache-service/redis-cache.service';

@Injectable()
export class AppService {
  constructor(private readonly cache: RedisCacheService) {}

  getHello(): Promise<unknown> {
    return this.cache.clearCache();
  }
}
