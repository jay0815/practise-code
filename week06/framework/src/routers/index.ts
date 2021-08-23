import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();
/**
 * koa路由模块化处理
 * 所有路由请按功能模块写在./routers 文件夹中,并统一在该文件引入功能模块的路由
 */

//  mysql
import mysql from "./mysql-controller";
//  redis
import redis from "./redis-controller";
// mongo
import mongo from "./mongo-controller";
// Elasticsearch
import es from "./es-controller";

router.use(mysql).use(redis).use(mongo).use(es);

// Export router
export default router;