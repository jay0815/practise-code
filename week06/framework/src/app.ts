import Koa from "koa";
import koaBody from "koa-body";

import routers from './routers';
import koa2mysql from "./middleware/koa-mysql";
import koa2mongo from "./middleware/koa-mongoose";
import koa2redis from "./middleware/koa-redis";
import { Context } from "./interface";

const app = new Koa<any, Context>();

// const mysqlDB = {
//   host: "",
//   user: "",
//   password: "",
//   database: ""
// };

const redisDB = {
  host: "127.0.0.1",
  port: 6379,
};

// const mongoDB = {
//   dbName: 'todos',
//   user: 'master',
//   pass: 'master!123',
//   url: 'localhost:27017',
// };

const mysqlDB = undefined;
// const redisDB = undefined;
const mongoDB = undefined;

app.use(koaBody())
  // .use(koa2mysql(mysqlDB))
  .use(koa2redis(redisDB))
  // .use(koa2mongo(mongoDB))
  .use(routers.routes())
  // .use(routers.allowedMethods());


app.on('close', async () => {
  console.log('close...');
  
  const { mysql, mongoose, redis, elastic } = app.context;
  if (mysql) {
    await mysql.close();
  }
  if (mongoose) {
    await mongoose.disconnect();
  }
  if (redis) {
    redis.disconnect();
  }
  if (elastic) {
    await elastic.close();
  }
})

app.listen(3000, () => {
  console.log('start on 3000 port');
});