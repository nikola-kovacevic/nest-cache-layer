/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@nestjs/common';

import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

import { promiseFrom } from '../../utils/utils';

@Injectable()
export class RedisCacheService {
  cacheEnabled = true;

  type = {
    object: 'object',
    string: 'string',
  };

  key = {
    empty: 0,
    hash: 'data',
  };

  message = {
    cacheNotUsed: 'Cache is not used!',
    cacheUnavailable: 'Cache is unavailable!',
  };

  constructor(@InjectRedis() private readonly redis: Redis) {}

  private useCache(): Promise<boolean> {
    // This should be extended with additional logic that determines if cache should be used (i.e. feature flag)
    return promiseFrom(this.cacheEnabled);
  }

  private run(command: Function, fallback: unknown): Promise<any> {
    return this.useCache().then((useCache) => (useCache ? command : fallback));
  }

  private set(key: string, value: any, ttl?: number): Promise<unknown> {
    const setFunction =
      typeof value === this.type.object
        ? this.setHash(key, value)
        : this.setValue(key, value);

    return setFunction
      .then(() => ttl && this.run(this.redis.expire(key, ttl), this.key.empty))
      .then(() => value);
  }

  private setValue(key: string, value: any): Promise<unknown> {
    return this.run(this.redis.set(key, value), value);
  }

  private setHash(key: string, value: any): Promise<unknown> {
    return this.run(
      this.redis.hset(key, this.key.hash, JSON.stringify(value)),
      value,
    );
  }

  private getString(key: string): Promise<string> {
    return this.redis.get(key);
  }

  private getHash(key: string): Promise<object | Array<any>> {
    return this.redis.hget(key, this.key.hash).then(JSON.parse);
  }

  get(key: string, fn: Function, ttl?: number): Promise<unknown> {
    return this.useCache().then((useCache) =>
      useCache
        ? this.redis
            .type(key)
            .then((type) =>
              type === this.type.string
                ? this.getString(key)
                : this.getHash(key),
            )
            .then((data) =>
              data === null
                ? promiseFrom(fn()).then((value) => this.set(key, value, ttl))
                : data,
            )
        : promiseFrom(fn()),
    );
  }

  exists(key: string): Promise<boolean> {
    // Conversion to boolean happens because Redis client returns 0 or 1
    return this.run(this.redis.exists(key), this.key.empty).then(
      (exists) => !!exists,
    );
  }

  clearCache(): Promise<string> {
    return this.run(this.redis.flushdb(), this.message.cacheNotUsed);
  }

  clearKeys(key): Promise<number> {
    return this.run(this.redis.keys(`*{${key}}*`), []).then(
      (keysToRemove) =>
        keysToRemove.length > 0 &&
        this.run(this.redis.del(...keysToRemove), this.key.empty),
    );
  }

  delete(key: string): Promise<string> {
    return this.run(this.redis.del(key), this.message.cacheNotUsed);
  }
}
