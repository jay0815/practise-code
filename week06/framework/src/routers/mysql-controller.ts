import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/mysql");
// 获取用户信息
router.get('/search', async (ctx) => {
  console.log("mysql search");
});
// 获取系统权限信息
router.post('/insert', async (ctx) => {
  console.log("mysql insert");
});

export default router.routes();