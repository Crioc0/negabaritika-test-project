<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { status } = storeToRefs(authStore)
const router = useRouter()
async function logout() {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="header container">
    <nav class="nav">
      <RouterLink to="/" class="link">Главная </RouterLink>
      <RouterLink to="/settings" class="link">Добавить тариф </RouterLink>
    </nav>
    <button class="button" v-if="status === 'authenticated'" @click="logout">Выйти</button>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 2rem 1rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e40af;

  .button {
    border-radius: 2rem;
    border: none;
    padding: 1rem 2rem;
    background-color: var(--background-color);
    cursor: pointer;
  }
  .nav {
    display: flex;
    gap: 1rem;
    .link {
      text-decoration: none;
      color: var(--link-color);
    }
  }
}
</style>
