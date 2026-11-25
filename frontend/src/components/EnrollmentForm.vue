<script setup>
import { ref } from 'vue'
import { useStudentStore } from '@/stores/students'
import { useCourseStore } from '@/stores/courses'
import { useEnrollmentStore } from '@/stores/enrollments'
import { useNotifyStore } from '@/stores/notify'

const students = useStudentStore()
const courses = useCourseStore()
const enrollments = useEnrollmentStore()
const notify = useNotifyStore()

const studentId = ref('')
const courseId = ref('')
const submitting = ref(false)

async function submit() {
  if (!studentId.value || !courseId.value) {
    notify.error('Select both a student and a course.')
    return
  }
  submitting.value = true
  try {
    await enrollments.enroll(studentId.value, courseId.value)
    notify.success('Student enrolled successfully!')
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
      <label for="enrollStudent">Select Student</label>
      <select id="enrollStudent" v-model="studentId">
        <option value="">-- Select Student --</option>
        <option v-for="s in students.students" :key="s._id" :value="s._id">
          {{ s.name }} ({{ s.studentId }})
        </option>
      </select>
    </div>
    <div>
      <label for="enrollCourse">Select Course</label>
      <select id="enrollCourse" v-model="courseId">
        <option value="">-- Select Course --</option>
        <option v-for="c in courses.courses" :key="c._id" :value="c._id">
          {{ c.name }} ({{ c.courseId }})
        </option>
      </select>
    </div>
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Enrolling…' : 'Enroll Student' }}
    </button>
  </form>
</template>