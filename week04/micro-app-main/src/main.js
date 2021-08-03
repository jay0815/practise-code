import { createApp, reactive } from 'vue'
import App from './App.vue'
import { registerMicroApps, initGlobalState, start } from 'qiankun';

const initialState = reactive({
  user: {
    name: 'zhangsan'
  }
})

const actions = initGlobalState(initialState)

// actions.onGlobalStateChange((newState, prev) => {
//   // state: 变更后的状态; prev 变更前的状态
//   console.log('main change', JSON.stringify(newState), JSON.stringify(prev))
//   for (const key in newState) {
//     initialState[key] = newState[key]
//   }
// })

// // 定义一个获取state的方法下发到子应用
actions.getGlobalState = (key) => {
  return key ? initialState[key] : initialState
}
// // 定义一个获取state的方法下发到子应用
// actions.setGlobalState = (state) => {
//   initialState = state;
// }

const microApps = [
  {
    name: 'react app', // app name registered
    entry: '//localhost:7001',
    container: '#react',
    activeRule: '/',
  },
  {
    name: 'vue app',
    entry: '//localhost:7002',
    container: '#vue',
    activeRule: '/',
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: actions.getGlobalState, // 下发getGlobalState方法
      setGlobalState: actions.setGlobalState // 下发setGlobalState方法
    }
  }
})


registerMicroApps(apps);

start({ singular: false });

createApp(App).mount('#app')
