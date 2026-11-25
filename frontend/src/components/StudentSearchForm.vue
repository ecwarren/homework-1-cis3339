<script setup>
import { ref } from 'vue'
import { useStudentStore } from '@/stores/students'
import { useNotifyStore } from '@/stores/notify'

const store = useStudentStore()
const notify = useNotifyStore()
const name = ref('')

async function search() {
  await store.fetchStudents(name.value.trim())
  if (store.error) notify.error(store.error)
  else if (store.students.length === 0) notify.error('Cannot find the student.')
}

async function showAll() {
  name.value = ''
  await store.fetchStudents()
}
</script>

<template>
  <form class="row" @submit.prevent="search">
    <label for="studentName">Student Name</label>
    <input id="studentName" v-model="name" type="text" required />
    <button type="submit">Search</button>
    <button type="button" class="secondary" @click="showAll">Show all</button>
  </form>
</template>