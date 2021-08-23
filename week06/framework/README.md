# Week05

## 使用Koa 实现连接 MySQL、Redis、MongoDB、ElasticSearch

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
sh start.sh >log.txt 2>&1

```

* 测试功能 [test](./test/client.ts)

```code
yarn test
```

* 校验
  * mongo使用mongo-express 查看数据插入情况
    * 地址 [http//:localhost:8081](http//:localhost:8081)
    * 账号：root
    * 密码：mongodb
