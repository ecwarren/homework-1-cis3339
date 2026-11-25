<script setup>
import { reactive, ref } from 'vue'
import { useCourseStore } from '@/stores/courses'
import { useNotifyStore } from '@/stores/notify'

const store = useCourseStore()
const notify = useNotifyStore()
const form = reactive({ courseId: '', name: '' })
const submitting = ref(false)

async function submit() {
  if (!form.courseId.trim() || !form.name.trim()) {
    notify.error('Course ID and course name are required.')
    return
  }
  submitting.value = true
  try {
    await store.addCourse({ ...form })
    notify.success('Course added successfully!')
    form.courseId = ''
    form.name = ''
  } catch (e) {
    notify.error(e.message)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="grid" @submit.prevent="submit">
    <div>
      <label for="courseId">Course ID</label>
      <input id="courseId" v-model="form.courseId" required />
    </div>
    <div>
      <label for="courseName">Course Name</label>
      <input id="courseName" v-model="form.name" required />
    </div>
    <button type="submit" :disabled="submitting">{{ submitting ? 'Adding…' : 'Add Course' }}</button>
  </form>
</template>