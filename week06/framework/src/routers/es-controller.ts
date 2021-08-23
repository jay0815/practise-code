import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/es");
// 获取用户信息
router.get('/search', async (ctx) => {
  console.log("es search");
});
// 获取系统权限信息
router.post('/insert', async (ctx) => {
  console.log("es insert");
});

export default router.routes();