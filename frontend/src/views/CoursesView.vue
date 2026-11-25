<script setup>
import { onMounted } from 'vue'
import { useCourseStore } from '@/stores/courses'
import CourseForm from '@/components/CourseForm.vue'
import CourseTable from '@/components/CourseTable.vue'

const store = useCourseStore()
onMounted(() => store.fetchCourses())
</script>

<template>
  <h1>Courses</h1>
  <section class="card"><h2>Add a Course</h2><CourseForm /></section>
  <section class="card"><h2>All Courses</h2><CourseTable /></section>
</template>