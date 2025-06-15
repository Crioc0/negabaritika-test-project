<script setup lang="ts">
import type { Tariff } from '@/types/tariffs'
import type { PropType } from 'vue'

defineProps({
  tariff: {
    type: Object as PropType<Tariff>,
    required: true,
  },
})
</script>

<template>
  <div class="tariff-card">
    <h3>Тариф: {{ tariff.val }}</h3>
    <ul>
      <li v-for="(qrs, index) in tariff.qrs" :key="index">
        {{ qrs }}
      </li>
    </ul>
    <p>Обработан: {{ tariff.processed ? 'Да' : 'Нет' }}</p>
    <p>Создан: {{ new Date(tariff.created).toLocaleString() }}</p>
  </div>
</template>

<style scoped>
.tariff-card {
  border: 1px solid var(--border-color);
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: var(--background-color);
}
</style>
