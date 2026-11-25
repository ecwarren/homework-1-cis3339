<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '@/stores/students'
import { useCourseStore } from '@/stores/courses'
import EnrollmentForm from '@/components/EnrollmentForm.vue'
import CourseRoster from '@/components/CourseRoster.vue'

const students = useStudentStore()
const courses = useCourseStore()

onMounted(() => {
  students.fetchStudents()   // also clears any search filter from the Students page
  courses.fetchCourses()
})
</script>

<template>
  <h1>Enrollments</h1>
  <section class="card"><h2>Enroll Student in Course</h2><EnrollmentForm /></section>
  <section class="card"><h2>Students in Course</h2><CourseRoster /></section>
</template>