import { initDB } from '@/services/idb'

export const authApi = {
  async getToken(): Promise<string | null> {
    const db = await initDB()
    return (await db.get('auth', 'token')) || null
  },

  async saveToken(token: string): Promise<void> {
    const db = await initDB()
    await db.put('auth', token, 'token')
  },

  async deleteToken(): Promise<void> {
    const db = await initDB()
    await db.delete('auth', 'token')
  },

  async login(username: string, password: string): Promise<{ token: string }> {
    if (username === '' || password === '') {
      throw new Error('Неверный формат данных')
    }

    return new Promise((resolve) => {
      setTimeout(() => resolve({ token: 'mock_token' }), 1000)
    })
  },
}
