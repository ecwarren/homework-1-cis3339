<script setup>
import AppNav from '@/components/AppNav.vue'
import AlertBanner from '@/components/AlertBanner.vue'
</script>

<template>
  <AppNav />
  <main class="container">
    <AlertBanner />
    <RouterView />
  </main>
</template>