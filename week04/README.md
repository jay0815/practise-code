# Week04

## 微前端（作业1）

### 实现方式

* 使用 乾坤内置 initGlobalState 构建 全局 store
* 主应用 store 的 store 通过 props 传递 给 子应用
* 子应用 
  * react 侧栏部分使用网易新闻开放api 作为 展示数据来源接口
  * react 侧栏点击新闻标题时，会通过 setGlobalState 更新 url
  * vue 侧通过 onGlobalStateChange 回调响应变化，更新 url 的 ref，进而 其中的iframe 跳转至具体新闻页

### 启动方式

* 进入 [base](./micro-app-main)

```code
yarn serve
```

* 进入 [side-bar](./micro-app-react)

```code
yarn start
```

* 进入 [main-content](./micro-app-vue)

```code
yarn serve
```

浏览器打开 [localhost:7000](http://localhost:7000) 或者 [127.0.0.1:7000](http://127.0.0.1:7000)

## 使用docker-compose 构建环境（作业2）

* 分别对 main 、react 、vue 在 基于 nodejs 的 docker image 中进行打包
* 使用 docker-compose 执行 main、react、vue 的 dockerfile 并设置打包后的 静态资源文件目录 为公共volume
* 挂载 上述 公共volume 至 nginx 基础镜像 的 html 路径下
* 替换 nginx 服务中的 nginx.conf 为 宿主机上对应的 nginx.conf
* 同步  宿主机上 针对 qiankun 框架下资源加载时 需要的 CORS 相关配置

### 启动方式

> docker、docker-compose 安装方式忽律，不再叙述

```code
docker-compose up -d
```

浏览器打开 [localhost:7000](http://localhost:7000) 或者 [127.0.0.1:7000](http://127.0.0.1:7000)