<script setup>
import { reactive, ref } from 'vue'
import { useStudentStore } from '@/stores/students'
import { useNotifyStore } from '@/stores/notify'

const store = useStudentStore()
const notify = useNotifyStore()
const empty = () => ({ name: '', studentId: '', phone: '', zip: '' })
const form = reactive(empty())
const submitting = ref(false)

async function submit() {
  if (Object.values(form).some((v) => !String(v).trim())) {
    notify.error('All fields are required.')
    return
  }
  submitting.value = true
  try {
    await store.addStudent({ ...form })
    notify.success('Student added successfully!')
    Object.assign(form, empty())
  } catch (e) {
    notify.error(e.message)
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <form class="grid" @submit.prevent="submit">
    <div><label for="addName">Name</label><input id="addName" v-model="form.name" required /></div>
    <div><label for="addId">Student ID</label><input id="addId" v-model="form.studentId" required /></div>
    <div><label for="addPhone">Phone</label><input id="addPhone" v-model="form.phone" required /></div>
    <div><label for="addZip">ZIP</label><input id="addZip" v-model="form.zip" required /></div>
    <button type="submit" :disabled="submitting">{{ submitting ? 'Adding…' : 'Add Student' }}</button>
  </form>
</template>