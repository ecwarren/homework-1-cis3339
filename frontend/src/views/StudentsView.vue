<script setup>
import { onMounted } from 'vue'
import { useStudentStore } from '@/stores/students'
import StudentSearchForm from '@/components/StudentSearchForm.vue'
import StudentForm from '@/components/StudentForm.vue'
import StudentTable from '@/components/StudentTable.vue'

const store = useStudentStore()
onMounted(() => store.fetchStudents())
</script>

<template>
  <h1>Students</h1>
  <section class="card"><h2>Search for a Student</h2><StudentSearchForm /></section>
  <section class="card"><h2>Add a Student</h2><StudentForm /></section>
  <section class="card"><h2>Results</h2><StudentTable /></section>
</template>