<script setup>
import { useStudentStore } from '@/stores/students'
import { useNotifyStore } from '@/stores/notify'

const store = useStudentStore()
const notify = useNotifyStore()

async function remove(student) {
  if (!confirm(`Delete student ${student.name}?`)) return
  try {
    await store.deleteStudent(student._id)
    notify.success('Student deleted successfully.')
  } catch (e) {
    notify.error(e.message)
  }
}
</script>

<template>
  <p v-if="store.loading">Loading students…</p>
  <p v-else-if="store.error" class="error-text">{{ store.error }}</p>
  <p v-else-if="store.students.length === 0">No students found.</p>
  <div v-else class="table-wrap">
    <table>
      <thead>
        <tr><th>Name</th><th>ID</th><th>Phone</th><th>ZIP</th><th>Action</th></tr>
      </thead>
      <tbody>
        <tr v-for="s in store.students" :key="s._id">
          <td>{{ s.name }}</td>
          <td>{{ s.studentId }}</td>
          <td>{{ s.phone }}</td>
          <td>{{ s.zip }}</td>
          <td><button type="button" class="danger" @click="remove(s)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>