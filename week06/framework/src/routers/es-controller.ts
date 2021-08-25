import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/es");

router
  .param('key', (k, ctx, next) => {
    ctx.query['key'] = k;
    return next();
  })
  .param('value', (v, ctx, next) => {
    ctx.query['value'] = v;
    return next();
  })
  .get('/search/:key?/:value?', async (ctx) => {
    if (ctx.elastic) {
      let body;
      if (typeof ctx.query.key !== 'undefined' && typeof ctx.query.value !== 'undefined') {
        body = {
          query: {
            match: {
              [ctx.query.key as string]: ctx.query.value,
            },
          }
        }
      }
      const res = await ctx.elastic.search({
        allow_no_indices: true,
        ignore_unavailable: true,
        index: "todos", //相当于database
        body: body,
      });
      ctx.response.body = {
        code: 0,
        message: "ok",
        data: res.body.hits
      }
    } else {
        ctx.response.body = {
          code: -1,
          message: "es has disconnect"
        }
    }
  });

router.post('/insert', async (ctx) => {
  if (ctx.elastic) {
    const { subject, content, datetime, state } = ctx.request.body;
    await ctx.elastic.index({
      index: "todos", //相当于database
      body: {
        //文档到内容
        subject, content, datetime, state
      },
    });    
    ctx.response.body = {
      code: 0,
      message: "ok"
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "es has disconnect"
      }
  }
});

export default router.routes();