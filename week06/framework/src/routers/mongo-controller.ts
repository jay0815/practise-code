import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/mongo");

router.get('/search', async (ctx) => {
  if (ctx.mongoose) {
    const collections = ctx.mongoose.collection("todos");
    const res = await collections.find().toArray();    
    ctx.response.body = {
      code: 0,
      message: "ok",
      data: res
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "mongo has disconnect"
      }
    }
  }
);

router.post('/insert', async (ctx) => {
  if (ctx.mongoose) {
    const collections = ctx.mongoose.collection("todos");
    await collections.insert(ctx.request.body);
    ctx.response.body = {
      code: 0,
      message: "message has inserted into mongo"
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "mongo has disconnect"
      }
  }
});

export default router.routes();