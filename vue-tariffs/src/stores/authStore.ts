import { defineStore } from 'pinia'
import { authApi } from '@/api/authApi'
import { toastService } from '@/services/toastService'
import { ref } from 'vue'

interface AuthState {
  token: string | null
  status: 'unauthenticated' | 'authenticated' | 'loading'
  error: null | string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const status = ref<'unauthenticated' | 'authenticated' | 'loading'>('unauthenticated')

  async function loadToken(): Promise<void> {
    status.value = 'loading'
    try {
      token.value = await authApi.getToken()
      status.value = token.value ? 'authenticated' : 'unauthenticated'
    } catch (error) {
      console.error('Failed to load token:', error)
      token.value = null
      status.value = 'unauthenticated'
    }
  }

  async function isTokenValid(): Promise<boolean> {
    await loadToken()
    return token.value === 'mock_token'
  }

  async function login(username: string, password: string): Promise<void> {
    status.value = 'loading'
    try {
      const response = await authApi.login(username, password)
      await authApi.saveToken(response.token)

      token.value = response.token
      status.value = 'authenticated'
    } catch (error) {
      status.value = 'unauthenticated'
      const errorMessage = error instanceof Error ? error.message : 'Ошибка авторизации'
      toastService.error(errorMessage)
    }
  }

  async function logout(): Promise<void> {
    try {
      await authApi.deleteToken()
      token.value = null
      status.value = 'unauthenticated'

      toastService.info('Вы вышли из системы.')
    } catch (error) {
      console.error('Ошибка при выходе:', error)
    }
  }
  return { isTokenValid, login, logout, status, token }
})
