import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'


const About = { template: '<div>About</div>' }

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  { name: 'home', path: '/', component: import('./views/index.vue')  },
  { name: 'demo', path: '/demo', component: import('./views/Demo.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // `routes: routes` 的缩写
})

createApp(App).use(router).mount('#app')
