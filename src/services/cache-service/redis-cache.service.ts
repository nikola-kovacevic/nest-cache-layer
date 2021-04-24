import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

/* 
  This is to ensure we are always working with promises!
  you can see this SO thread why we are doing it this way 
  https://stackoverflow.com/questions/27746304/how-do-i-tell-if-an-object-is-a-promise/27746324#27746324  
*/
const ensurePromise = (fn) => Promise.resolve(fn);

@Injectable()
export class RedisCacheService {
  useCache = true;

  message = {
    cacheNotUsed: 'Cache is not used!',
  };

  constructor(@InjectRedis() private readonly redis: Redis) {}

  private shouldUseCache(): Promise<boolean> {
    // This should be extended with additional logic that determines if cache should be used (i.e. feature flag)
    return Promise.resolve(this.useCache);
  }

  exists(key: string): Promise<boolean> {
    return this.shouldUseCache()
      .then((useCache) => (useCache ? this.redis.exists(key) : 0))
      .then((exists) => Boolean(exists)); // Conversion happens because Redis client returns 0 or 1
  }

  clearCache(): Promise<string> {
    return this.shouldUseCache().then((useCache) =>
      useCache ? this.redis.flushdb() : this.message.cacheNotUsed,
    );
  }
}
