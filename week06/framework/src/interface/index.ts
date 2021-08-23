import Koa from 'koa';
import { Mongoose } from '../middleware/koa-mongoose';
import { MySQL } from '../middleware/koa-mysql';
import { IORedis } from '../middleware/koa-redis';
import { Elastic } from '../middleware/koa-elastic';

export interface Context extends Koa.Context {
  mongoose?: Mongoose;
  mysql?: MySQL;
  redis?: IORedis;
  elastic?: Elastic;
}