<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

import TariffCard from '@/components/TariffCard.vue'
import { useTariffStore } from '@/stores/tariffStore'

const tariffStore = useTariffStore()

const tariffs = computed(() => tariffStore.tariffs)
const isLoading = ref(true)

onMounted(async () => {
  await tariffStore.loadTariffs()
  isLoading.value = false
})
</script>

<template>
  <main>
    <h1>Список тарифов</h1>
    <div class="container">
      <div v-if="isLoading" class="loading-state">
        <p>Загрузка тарифов...</p>
      </div>

      <div v-else-if="tariffs.length === 0" class="empty-state">
        <p>Тарифы отсутствуют. Добавьте новый тариф.</p>
      </div>

      <div v-else class="tariff-list">
        <TariffCard v-for="(tariff, k) in tariffs" :key="k" :tariff="tariff" />
        <RouterLink to="/settings" class="link"
          ><button class="button">Добавить</button>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
.loading-state {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}

.empty-state {
  text-align: center;
  font-size: 1.2rem;
  color: #999;
}

.tariff-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }

  .button {
    width: 100%;
    height: 100%;
    padding: 1rem;
    cursor: pointer;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    font-size: 3rem;
    font-weight: 700;
  }
}
</style>
