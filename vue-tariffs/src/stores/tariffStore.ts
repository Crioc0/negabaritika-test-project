import { defineStore } from 'pinia'
import { toastService } from '@/services/toastService'
import { initDB } from '@/services/idb'
import { ref, toRaw } from 'vue'
import type { Tariff } from '@/types/tariffs'

export const useTariffStore = defineStore('tariff', () => {
  const tariffs = ref<Tariff[]>([])
  async function loadTariffs() {
    try {
      const db = await initDB()
      const storedTariffs = await db.get('tariffs', 'list')
      tariffs.value = storedTariffs || []
    } catch (error) {
      console.error('Ошибка при загрузке из IndexedDB:', error)
      toastService.error('Ошибка при загрузке тарифов.')
    }
  }

  async function addTariff(tariff: Tariff) {
    try {
      tariff.processed = true
      const db = await initDB()
      tariffs.value.push(tariff)
      const rawTariffs = toRaw(tariffs.value)
      await db.put('tariffs', rawTariffs, 'list')
      toastService.success('Тариф успешно добавлен.')
    } catch (error) {
      tariff.processed = false
      tariffs.value.push(tariff)
      console.error('Ошибка при сохранении в IndexedDB:', error)
      toastService.error('Ошибка при сохранении тарифа.')
    }
  }
  return { loadTariffs, addTariff, tariffs}
})


