import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useStudentStore = defineStore('students', () => {
  const students = ref([])
  const loading = ref(false)
  const error = ref('')

  async function fetchStudents(name = '') {
    loading.value = true
    error.value = ''
    try {
      const q = name ? `?name=${encodeURIComponent(name)}` : ''
      students.value = await api(`/students${q}`)
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function addStudent(payload) {
    const created = await api('/students', { method: 'POST', body: payload })
    students.value.push(created)
  }

  async function deleteStudent(id) {
    await api(`/students/${id}`, { method: 'DELETE' })
    students.value = students.value.filter((s) => s._id !== id)
  }

  return { students, loading, error, fetchStudents, addStudent, deleteStudent }
})