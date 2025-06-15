// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import LoginPage from '@/views/LoginView.vue'
import TariffListView from '@/views/TariffListView.vue'
import TariffSetupView from '@/views/TariffSetupView.vue'

const routes = [
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/settings', name: 'tariffs', component: TariffSetupView },
  { path: '/', name: 'Главная', component: TariffListView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  const isValid = await auth.isTokenValid()

  if (isValid && to.name === 'Login') {
    return next({ name: 'Home' })
  }

  if (!isValid && to.name !== 'Login') {
    return next({ name: 'Login' })
  }

  next()
})

export default router
