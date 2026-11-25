import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useEnrollmentStore = defineStore('enrollments', () => {
  const roster = ref([])
  const loading = ref(false)
  const error = ref('')

  async function enroll(studentId, courseId) {
    await api('/enrollments', { method: 'POST', body: { studentId, courseId } })
  }

  async function fetchRoster(courseId) {
    loading.value = true
    error.value = ''
    try {
      roster.value = await api(`/courses/${courseId}/students`)
    } catch (e) {
      error.value = e.message
      roster.value = []
    } finally {
      loading.value = false
    }
  }

  return { roster, loading, error, enroll, fetchRoster }
})