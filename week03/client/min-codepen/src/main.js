import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'

const routes = [
  { path: '/', component: App, redirect: 'home' },
  { path: '/home', name: 'home', component: () => import('./Views/Home.vue') },
  { path: '/template', name: 'template', component: () => import('./Views/Template.vue') },
  { path: '/complier', name: 'complier', component: () => import('./Views/Complier.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
