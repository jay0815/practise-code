import { Context, Next } from 'koa';
import mysql, { Pool, PoolConfig } from 'mysql';

export class MySQL {
  instance?: Pool;
  constructor(options: PoolConfig) {
    this.instance = mysql.createPool({
        host: options.host,
        user: options.user,
        password: options.password,
        database: options.database,
        port: options.port,
    });
  }

  query(sql: string, values?: string[]) {
    if (this.instance) {
      return new Promise((resolve, reject) => {
          this.instance!.getConnection((err, connection) => {
              if (err) {
                  reject(err)
              } else {
                  connection.query(sql, (err, rows) => {
                      if (err) {
                          reject(err)
                      } else {
                          resolve(rows)
                      }
                      connection.release();
                  })
              }
          })
      })
    }
  }
  insert(sql: string, values: string[]) {
    if (this.instance) {
      return new Promise((resolve, reject) => {
          this.instance!.getConnection((err, connection) => {
              if (err) {
                  reject(err)
              } else {
                  connection.query(sql, values, (err, rows) => {
                      if (err) {
                          reject(err)
                      } else {
                          resolve(rows)
                      }
                      connection.release();
                  })
              }
          })
      })
    }
  }

  close() {
    if (this.instance) {
      return new Promise((resolve, reject) => {
        this.instance!.end((err) => {
          if (err) {
            reject(err)
          } else {
            resolve(void 0);
          }
        });
      })
    }
  }
}

export default (options?: PoolConfig) => {
  let instance: MySQL | undefined;
  if (options) {
    instance = new MySQL(options);
    console.log('MySQL instance has init');
  }
  return async (ctx: Context, next: Next) => {
    ctx.mysql = instance;
    await next();
  }
}