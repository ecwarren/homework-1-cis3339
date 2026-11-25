import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api'

export const useCourseStore = defineStore('courses', () => {
  const courses = ref([])
  const loading = ref(false)
  const error = ref('')

  async function fetchCourses() {
    loading.value = true
    error.value = ''
    try {
      courses.value = await api('/courses')
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function addCourse(payload) {
    const created = await api('/courses', { method: 'POST', body: payload })
    courses.value.push(created)
  }

  async function deleteCourse(id) {
    await api(`/courses/${id}`, { method: 'DELETE' })
    courses.value = courses.value.filter((c) => c._id !== id)
  }

  return { courses, loading, error, fetchCourses, addCourse, deleteCourse }
})