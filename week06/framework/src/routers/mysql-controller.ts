import Router from '@koa/router';
import { Context } from '../interface';

const router = new Router<any, Context>();

router.prefix("/mysql");

router.get('/init', async (ctx) => {
  if (ctx.mysql) {
    await ctx.mysql.query("DROP TABLE IF EXISTS todos");
    const res = await ctx.mysql.query(`CREATE TABLE todos (
      id int(11) NOT NULL AUTO_INCREMENT,
      name char(20) NOT NULL DEFAULT '' COMMENT '姓名',
      time DATETIME,
      sex CHAR(1) NOT NULL DEFAULT '2' COMMENT '性别 0：女 1：男 2：未知',
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8`);
    ctx.response.body = {
      code: 0,
      message: "ok",
      data: res
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "mysql has disconnect"
      }
    }
  }
);

router.get('/search', async (ctx) => {
  if (ctx.mysql) {
    const res = await ctx.mysql.query(`SELECT * FROM todos`);
    ctx.response.body = {
      code: 0,
      message: "ok",
      data: res
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "mysql has disconnect"
      }
    }
  }
);


router.post('/insert', async (ctx) => {
  if (ctx.mysql) {
    const { name, time, sex } = ctx.request.body;
    const res = await ctx.mysql.insert(`INSERT INTO todos(name, time, sex)  VALUES(?,?,?)`, [name, time, sex]);
    ctx.response.body = {
      code: 0,
      message: "ok",
      data: res
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "mysql has disconnect"
      }
  }
});

router.post('/update', async (ctx) => {
  if (ctx.mysql) {
    const { updateKey, updateValue, primarykey, primaryValue } = ctx.request.body;
    const res = await ctx.mysql.insert(`UPDATE todos SET ${updateKey} = ? WHERE ${primarykey} = ?`, [updateValue, primaryValue]);
    ctx.response.body = {
      code: 0,
      message: "ok",
      data: res
    }
  } else {
      ctx.response.body = {
        code: -1,
        message: "mysql has disconnect"
      }
  }
});

export default router.routes();