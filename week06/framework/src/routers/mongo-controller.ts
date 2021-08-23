import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/mongo");
// 获取用户信息
router.get('/search', async (ctx) => {
  console.log(ctx);
  console.log("mongo search");
});
// 获取系统权限信息
router.post('/insert', async (ctx) => {
  console.log("mongo insert");
});

export default router.routes();