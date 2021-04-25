import { Injectable } from '@nestjs/common';

import { RedisCacheService } from './services/cache-service/redis-cache.service';
import { randomFunction, slowRandomFunction } from './utils/utils';

@Injectable()
export class AppService {
  constructor(private readonly cache: RedisCacheService) {}

  clearCache(): Promise<unknown> {
    return this.cache.clearCache();
  }

  get(key: string): Promise<unknown> {
    return this.cache.get(key, randomFunction);
  }

  slowGet(key: string): Promise<unknown> {
    return this.cache.get(key, slowRandomFunction);
  }

  slowGetWithTTL(key: string): Promise<unknown> {
    return this.cache.get(key, slowRandomFunction, 10); // TTL is in seconds
  }

  delete(key: string): Promise<unknown> {
    return this.cache.delete(key);
  }

  exists(key: string): Promise<unknown> {
    return this.cache.exists(key);
  }
}
