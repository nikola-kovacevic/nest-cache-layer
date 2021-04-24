import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisCacheService {
  useCache = true;

  constructor(@InjectRedis() private readonly redis: Redis) {}

  private shouldUseCache(): boolean {
    // This should be extended with additional logic that determines if cache should be used (i.e. feature flag)
    return this.useCache;
  }

  async exists(key: string): Promise<boolean> {
    if (this.shouldUseCache()) {
      const exists = await this.redis.exists(key);
      // Conversion happens as Redis returns 1 if the key exists or 0 if it doesn't
      return Boolean(exists);
    }

    return Promise.resolve(false);
  }

  // async clearCache() {}
}
