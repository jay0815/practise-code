# Week08

## 基于 Websocket & WebRtc 实现视频会议

### 实现方式

* Websocket 服务充当指令分发服务
* webrtc 进行实际 P2P 连接

### 启动方式

* 启动 ws 服务

```code
node app.js

```

* 开启视频服务

```code
yarn dev
```

* 房主进入 [master](http://localhost:3000/master)
  * 输入用户名
  * 创建 房间
  * 复制 房间uuid
  * 分享给参与者
* 成员进入 [guest](http://localhost:3000/guest)
  * 输入用户名
  * 输入房间 uuid
  * 点击加入
