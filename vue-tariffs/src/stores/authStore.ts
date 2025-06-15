import { defineStore } from 'pinia'
import { authApi } from '@/api/authApi'
import { toastService } from '@/services/toastService'

interface AuthState {
  token: string | null
  status: 'unauthenticated' | 'authenticated' | 'loading'
  error: null | string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    status: 'unauthenticated',
    error: null,
  }),

  actions: {
    async loadToken(): Promise<void> {
      this.status = 'loading'
      try {
        this.token = await authApi.getToken()
        this.status = this.token ? 'authenticated' : 'unauthenticated'
      } catch (error) {
        console.error('Failed to load token:', error)
        this.token = null
        this.status = 'unauthenticated'
      }
    },

    async isTokenValid(): Promise<boolean> {
      await this.loadToken()
      return this.token === 'mock_token'
    },

    async login(username: string, password: string): Promise<void> {
      this.status = 'loading'
      try {
        const response = await authApi.login(username, password)
        await authApi.saveToken(response.token)

        this.token = response.token
        this.status = 'authenticated'


      } catch (error) {
        this.status = 'unauthenticated'
        this.error = error instanceof Error? error.message : 'Ошибка авторизации'
        toastService.error(this.error)
      }
    },

    async logout(): Promise<void> {
      try {
        await authApi.deleteToken()
        this.token = null
        this.status = 'unauthenticated'

        toastService.info('Вы вышли из системы.')
      } catch (error) {
        console.error('Ошибка при выходе:', error)
      }
    },
  },
})
