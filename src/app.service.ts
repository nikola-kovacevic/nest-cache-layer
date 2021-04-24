import { Injectable } from '@nestjs/common';

import { RedisCacheService } from './services/cache-service/redis-cache.service';
import { randomValue } from './utils/utils';

@Injectable()
export class AppService {
  constructor(private readonly cache: RedisCacheService) {}

  clearCache(): Promise<unknown> {
    return this.cache.clearCache();
  }

  get(key: string): Promise<unknown> {
    return this.cache.get(key, randomValue);
  }

  delete(key: string): Promise<unknown> {
    return this.cache.delete(key);
  }

  exists(key: string): Promise<unknown> {
    return this.cache.exists(key);
  }
}
