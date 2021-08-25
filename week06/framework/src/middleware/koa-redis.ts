import IORedis from 'ioredis';
import Redis, { RedisOptions } from 'ioredis';
import { Context, Next } from 'koa';

const ERROR_SYMBOL = "READONLY";
export type IORedis = IORedis.Redis;

export default (options?: RedisOptions) => {
  let instance : IORedis.Redis | undefined;
  if (options) {
    instance = new Redis({
      ...options,
      maxRetriesPerRequest: 1,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError: (err) => {
        if (err.message.includes(ERROR_SYMBOL)) {
          // Only reconnect when the error contains "READONLY"
          return true;
        }
        return false;
      },
    });
    console.log('Redis instance has init');
  }

  return async (ctx: Context, next: Next) => {
    ctx.redis = instance;
    await next();
  };
};