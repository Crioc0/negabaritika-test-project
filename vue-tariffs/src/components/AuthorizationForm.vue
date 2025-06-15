<script setup lang="ts">
import { computed, reactive } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { toastService } from '@/services/toastService'

const authStore = useAuthStore()
const router = useRouter()

const user = reactive({
  login: '',
  password: '',
})

const isFormDisable = computed(() => {
  return !user.login || !user.password
})

async function login() {
  try {
    await authStore.login(user.login, user.password)
    if (authStore.token) {
      toastService.success('Вы успешно авторизовались!')
    }
    router.push('/')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <form class="form container" @submit.prevent="login">
    <h3>Авторизация</h3>
    <div>
      <label for="login">Логин</label>
      <input type="text" name="login" v-model="user.login" />
    </div>
    <div>
      <label for="password">Пароль</label>
      <input type="password" name="password" v-model="user.password" />
    </div>
    <button type="submit" :disabled="isFormDisable">Войти</button>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    justify-content: space-between;
  }
  input {
    min-width: 300px;
  }
}
</style>
