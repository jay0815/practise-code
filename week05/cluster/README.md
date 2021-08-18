# Week04

## cluster（作业1）

### 实现方式

* 使用 net 创建 socket 服务器作为 master
* 使用 cluster 创建 work 作为 slave
  * 通过 队列 记录 work，方便 master 进行 任务分配
* 通过 socket 服务器 进行流量 管控，并进行流量分发
  * 如果不手动创建 master 服务进行管控，则会由 cluster 自行进行 任务分发（默认使用cluster自带的 Round Robin算法调度）
* 于 [schedule](./schedule.js) 自实现了 Round Robin 和 Ip Hash 两种调度方式
* 实现了 randomKillSignal 模拟生成 自杀信号
  * work 接受到 信号后，在完成socket通讯后，会自调用 disconnect 进行自杀
  * 主服务 监听 work 的 disconnect 行为，并重新创建 work
* 调度过程中再面对大量请求时会出现没有空闲进程 或者 当前分配不够合理(IP Hash Schedule 实现算法不够离散，会时常出现分配给同一个 work的情况，导致堵塞)，所以采用 缓存策略，进行 请求记录，当有空闲 work 或者 当前 work 空闲时，对已排队的任务进行消费

### 启动方式

* 启动 [main](./main.js)

> round robin schedule

```code
node main rb 
```

or

> ip hash schedule

```code
node main 
```

* 启动 [client](./client.js)

```code
node client
```
