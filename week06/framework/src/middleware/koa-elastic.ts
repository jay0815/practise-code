import { Client, ClientOptions } from '@elastic/elasticsearch';
import { Context, Next } from 'koa';

export type Elastic = Client

export default async (options?: ClientOptions & { healthcheck: boolean }) => {
  let instance: Elastic | undefined;

  if (options) {
    const { healthcheck, ...other } = options;
    instance = new Client(other);
    // 健康监测
    if (healthcheck !== false) {
      await instance.ping()
    }
  }

  return async (ctx: Context, next: Next) => {
    ctx.elastic = instance;
    await next();
  };
};