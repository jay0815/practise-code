# Week09

## 基于 react & react-dnd & monaco 实现的基础版low-code 工具

### 实现方式

* 借助 react-dnd 实现拖拽
* 使用 monaco 显示 json

### 启动方式

* 启动应用

```code
yarn dev
```

* 鼠标拖拽的配置的工具
  * 拖动左侧列表的组件至中间 放置部分
    * 显示对应组件
    * 实时生成对应的配置json

* 一个能渲染 JSON 配置的 form 组件
  * 复制以下 json 粘贴至 monaco 编辑器中
    * 显示对应组件
    * 删除部分json 中的顶级 key 会让 form 回显部分变化

```json
{
"1631125534465": {
  "type": "button",
  "props": {}
},
"1631125536069": {
  "type": "select",
  "props": {
    "options": [
      {
        "title": "jack",
        "key": "select-0",
        "value": "jack"
      },
      {
        "title": "rose",
        "key": "select-1",
        "value": "rose"
      },
      {
        "title": "tom",
        "key": "select-2",
        "value": "tom"
      }
    ]
  }
}
}
```
