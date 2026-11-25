<script setup>
import { useNotifyStore } from '@/stores/notify'
const notify = useNotifyStore()
</script>

<template>
  <div
    v-if="notify.message"
    class="alert"
    :class="notify.type"
    :role="notify.type === 'error' ? 'alert' : 'status'"
  >
    <span>{{ notify.message }}</span>
    <button type="button" class="link" aria-label="Dismiss message" @click="notify.clear()">✕</button>
  </div>
</template>