<script setup>
import { ref } from 'vue'
import { useCourseStore } from '@/stores/courses'
import { useEnrollmentStore } from '@/stores/enrollments'
import { useNotifyStore } from '@/stores/notify'

const courses = useCourseStore()
const enrollments = useEnrollmentStore()
const notify = useNotifyStore()

const courseId = ref('')
const searched = ref(false)

async function load() {
  if (!courseId.value) {
    notify.error('Select a course first.')
    return
  }
  await enrollments.fetchRoster(courseId.value)
  searched.value = true
  if (enrollments.error) notify.error(enrollments.error)
}
</script>

<template>
  <form class="row" @submit.prevent="load">
    <label for="rosterCourse">Select Course</label>
    <select id="rosterCourse" v-model="courseId">
      <option value="">-- Select Course --</option>
      <option v-for="c in courses.courses" :key="c._id" :value="c._id">
        {{ c.name }} ({{ c.courseId }})
      </option>
    </select>
    <button type="submit">List Students</button>
  </form>

  <p v-if="enrollments.loading">Loading…</p>
  <p v-else-if="searched && enrollments.roster.length === 0">
    No students are enrolled in this course.
  </p>
  <div v-else-if="enrollments.roster.length" class="table-wrap">
    <table>
      <thead>
        <tr><th>Name</th><th>ID</th><th>Phone</th><th>ZIP</th></tr>
      </thead>
      <tbody>
        <tr v-for="s in enrollments.roster" :key="s._id">
          <td>{{ s.name }}</td>
          <td>{{ s.studentId }}</td>
          <td>{{ s.phone }}</td>
          <td>{{ s.zip }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>