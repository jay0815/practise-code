import Koa from "koa";
import koaBody from "koa-body";

import routers from './routers';
import koa2mysql from "./middleware/koa-mysql";
import koa2mongo from "./middleware/koa-mongoose";
import koa2redis from "./middleware/koa-redis";
import koa2elastic from "./middleware/koa-elastic";
import { Context } from "./interface";

const app = new Koa<any, Context>();

const mysqlDB = {
  host: "localhost",
  user: "xxxxx", // xxxxx = dataUser
  password: "yyyyy", // yyyyy = 123qwe
  database: "todos",
  port: 3306
};

const redisDB = {
  host: "127.0.0.1",
  port: 6379,
};

const mongoDB = {
  dbName: 'todos',
  // user: 'master',
  // pass: 'master!123',
  user: 'root',
  pass: 'mongodb',
  url: 'mongodb://localhost:27017',
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const elasticDB = {
  node: "http://localhost:9200",
  healthcheck: true,
};

app.use(koaBody())
  .use(koa2elastic(elasticDB))
  .use(koa2mysql(mysqlDB))
  .use(koa2redis(redisDB))
  .use(koa2mongo(mongoDB))
  .use(routers.routes())


app.on('close', async () => {
  console.log('close...');
  
  const { mysql, mongoose, redis, elastic } = app.context;
  if (mysql) {
    await mysql.close();
  }
  if (mongoose) {
    await mongoose.close();
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