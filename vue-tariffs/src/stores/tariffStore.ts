import { defineStore } from 'pinia'
import { toastService } from '@/services/toastService'
import { initDB } from '@/services/idb'
import { toRaw } from 'vue'
import type { Tariff } from '@/types/tariffs'



export const useTariffStore = defineStore('tariff', {
  state: () => ({
    tariffs: [] as Tariff[],
  }),

  actions: {
    async loadTariffs() {
      try {
        const db = await initDB()
        const storedTariffs = await db.get('tariffs', 'list')
        console.log('Stored tariffs:', storedTariffs)
        console.log('Current state of tariffs:', this.tariffs)
        this.tariffs = storedTariffs || []
      } catch (error) {
        console.error('Ошибка при загрузке из IndexedDB:', error)
        toastService.error('Ошибка при загрузке тарифов.')
      }
    },

    async addTariff(tariff: Tariff) {
      try {
        tariff.processed = true
        const db = await initDB()
        this.tariffs.push(tariff)
        const rawTariffs = toRaw(this.tariffs)
        await db.put('tariffs', rawTariffs, 'list')
        toastService.success('Тариф успешно добавлен.')
      } catch (error) {
        tariff.processed = false
        this.tariffs.push(tariff)
        console.error('Ошибка при сохранении в IndexedDB:', error)
        toastService.error('Ошибка при сохранении тарифа.')
      }
    },
  },
})
