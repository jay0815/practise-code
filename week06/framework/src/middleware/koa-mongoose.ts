import { Context, Next } from "koa";
import mongoose, { ConnectOptions } from "mongoose";

interface MongooseOption extends ConnectOptions {
  url: string;
}

export type Mongoose = typeof mongoose;

export default (options?: MongooseOption) => {
  let instance: Mongoose | undefined;

  if (options) {
    mongoose.connect(options.url, {
      dbName: options.dbName,
      user: options.user,
      pass: options.pass,
      useNewUrlParser: options.useNewUrlParser,
      useUnifiedTopology: options.useUnifiedTopology
    });
    const instance = mongoose.connection;
    instance.on('open', () => {
        console.log('mongonDB 连接成功')
    });
    instance.on('error', () => {
        console.log('mongonDB 连接失败')
    });
  }

  return async (ctx: Context, next: Next) => {
    ctx.mongoose = instance;
    await next();
  };
};