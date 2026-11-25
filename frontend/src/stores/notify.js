import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotifyStore = defineStore('notify', () => {
  const message = ref('')
  const type = ref('success')
  let timer

  function show(msg, t) {
    message.value = msg
    type.value = t
    clearTimeout(timer)
    timer = setTimeout(clear, 5000)
  }
  const success = (m) => show(m, 'success')
  const error = (m) => show(m, 'error')
  function clear() { message.value = '' }

  return { message, type, success, error, clear }
})