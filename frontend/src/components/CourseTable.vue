<script setup>
import { useCourseStore } from '@/stores/courses'
import { useNotifyStore } from '@/stores/notify'

const store = useCourseStore()
const notify = useNotifyStore()

async function remove(course) {
  if (!confirm(`Delete ${course.courseId}? Its enrollments will also be removed.`)) return
  try {
    await store.deleteCourse(course._id)
    notify.success('Course deleted successfully.')
  } catch (e) {
    notify.error(e.message)
  }
}
</script>

<template>
  <p v-if="store.loading">Loading courses…</p>
  <p v-else-if="store.error" class="error-text">{{ store.error }}</p>
  <p v-else-if="store.courses.length === 0">No courses found.</p>
  <div v-else class="table-wrap">
    <table>
      <thead>
        <tr><th>Course ID</th><th>Course Name</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr v-for="c in store.courses" :key="c._id">
          <td>{{ c.courseId }}</td>
          <td>{{ c.name }}</td>
          <td><button type="button" class="danger" @click="remove(c)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>