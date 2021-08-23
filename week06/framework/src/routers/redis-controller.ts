import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/redis");
// 获取用户信息
router
  .param('key', (id, ctx, next) => {
    ctx.query['key'] = id;
    return next();
  })
  .get('/search/:key', async (ctx) => {
    const { key } = ctx.query;
    if (ctx.redis) {
      const res = await ctx.redis.get(key as string);
      ctx.response.body = {
        code: 0,
        message: "ok",
        data: res
      }
    } else {
      ctx.response.body = {
        code: -1,
        message: "redis has disconnect"
      }
    }
  });
// 获取系统权限信息
router.post('/insert', async (ctx) => {
  if (ctx.redis) {
    Object.keys(ctx.request.body).forEach((key) => {
      ctx.redis!.set(key, ctx.request.body[key]);
    });
    ctx.response.body = {
      code: 0,
      message: "redis has inserted"
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "redis has disconnect"
      }
  }
});

export default router.routes();