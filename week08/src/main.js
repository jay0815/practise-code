import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    name: 'master',
    path: '/master',
    component: () => import('./views/Master.vue'),
  },
  {
    name: 'guest',
    path: '/guest',
    component: () => import('./views/Guest.vue'),
  }],
})
createApp(App).use(router).mount('#app')
