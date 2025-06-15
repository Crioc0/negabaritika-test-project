<script setup lang="ts">
import { RouterView } from 'vue-router'

import HeaderNavigation from './components/HeaderNavigation.vue'
</script>

<template>
  <HeaderNavigation />
  <div class="container">
    <RouterView />
  </div>
</template>

<style lang="scss" scoped></style>
