import { Client, ClientOptions } from '@elastic/elasticsearch';
import { Context, Next } from 'koa';

export type Elastic = Client

export default (options?: ClientOptions & { healthcheck: boolean }) => {
  let instance: Elastic | undefined;

  if (options) {
    const { healthcheck, ...other } = options;
    instance = new Client(other);
    // 健康监测
    if (healthcheck !== false) {      
      instance.ping().then((i) => console.log('is ES status health?', i.body))
    }
  }

  return async (ctx: Context, next: Next) => {
    ctx.elastic = instance;
    await next();
  };
};