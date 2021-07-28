# week02

## server

* start

```javascript
yarn install
yarn dev
```

* codepen 模式
  * 选择 runtime & complier
  * 输入exmpale: https://codepen.io/team/Vue/pen/KKpRVpx
  * 支持在对应编辑器中 __ctrl + s__ 对单独类型文件的编译更新
  * 需要点击 preview 初始化环境
* codesandbox 模式
  * 选择 runtime
  * 需要输入 .vue 的 文件内容进行编译
  * 直接 __ctrl + s__ 进行在线编译
  * 使用 node 调用 webpack api 进行编译

## client

* start

```javascript
yarn install
node app.js
```

## todo

* 完善 webpack config的配置
* codesandbox 支持 目录与文件的展示、编辑
* 支持 错误内容的输入
* 替换 production 为 dev，让预览 支持 hmr 的局部热更新
