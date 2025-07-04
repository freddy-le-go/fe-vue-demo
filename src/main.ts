import { createApp } from 'vue'

import { createHead } from '@vueuse/head'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import ms from 'ms'
import { createPinia } from 'pinia'

import { useAuthStore } from '@/stores/auth/index'

import App from './App.vue'
import router from './router'

import './style.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: ms('5m'),
      gcTime: ms('10m'),
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
})

const app = createApp(App)
const head = createHead()
const pinia = createPinia()

app.use(router)
app.use(pinia)
app.use(head)
app.use(VueQueryPlugin, { queryClient })

const authStore = useAuthStore()
authStore.loadFromCookie()

app.mount('#app')
