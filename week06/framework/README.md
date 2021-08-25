# Week06

## 基于 Koa 实现 MySQL、Redis、MongoDB、ElasticSearch 等DB的连接与操作

### 实现方式

* 基于 koa2 + @koa/router + koa-body + typescript 构建基础服务环境
* 基于 ioredis 封装了一个简易 的 redis2koa 中间件
  * 单例访问，复用连接
  * 通过 ioredis 自带配置，完成了简易的被动自动重连功能
* 基于 mysql 封装了一个简易 的 mysql2koa 中间件
  * 单例访问，复用连接
  * 封装MySQL类，提供了使用更加简易的 query 与 close api
* 基于 @elastic/elasticsearch 封装了一个简易 的 elastic2koa 中间件
  * 单例访问，复用连接
  * 提供了 可传配置项 healthcheck，用于提供创建连接时的健康监测
* 基于 mongoose 封装了一个简易 的 mongo2koa 中间件
  * 单例访问，复用连接
* 通过抽离 重定义 koa-context 泛型，向上下文对象的类型中注入了上述数据库连接的实例 类型（便于api调用）

### 启动方式

* 使用脚本 [start](./start.sh) 启动 [app](./src/main.ts)

```code
sh start.sh

```

* 测试功能 [test](./test/client.ts)

```code
yarn test
```

* 校验
  * redis 使用浏览器 or Postman 查看数据插入情况
    * 地址 [http://localhost:8081:3000/redis/search/](http://localhost:3000/redis/search/) + 需要查询的键
  * mongo
    * 使用 mongo-express 查看数据插入情况
      * 地址 [http://localhost:8081](http://localhost:8081)
      * 账号：root
      * 密码：mongodb
    * 使用浏览器 or Postman 查看数据插入情况
      * 地址 [http://localhost:3000/mongo/search](http://localhost:3000/mongo/search)
  * mysql
    * 使用 phpmyadmin 查看数据插入情况
      * 地址 [http://localhost:9090](http://localhost:9090)
      * 账号：dataUser
      * 密码：123qwe
    * 使用浏览器 or Postman 查看数据插入情况
      * 地址 [http://localhost:3000/mysql/search](http://localhost:3000/mysql/search)
  * elasticsearch
    * 使用 elastichd 查看数据插入情况
      * 地址 http:// + 本机的IP地址 + :9800
    * 使用浏览器 or Postman 查看数据插入情况
      * 地址 [http://localhost:3000/es/search](http://localhost:3000/es/search) 查看 todos 下全部
      * 地址 [http://localhost:3000/es/search/](http://localhost:3000/es/search/) + ${key}/${value} 查看 todos 下 存在 kv 字段为 key: value 的 hit