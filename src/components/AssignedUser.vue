<template>
  <div class="flex flex-col mt-4">
    <Alert type="dark" class="mb-2">assigned to <b>
      {{ task.taskuser.user.name }}
    </b>
    </Alert>
    <div class="my-3 border-2 rounded p-2">
      <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
        Remarks
      </h5>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400" >
        {{ task.taskuser.remarks }}
      </p>
    </div>
    <Alert type="dark" class="mb-2">Start time <b>
      {{ moment(task.taskuser.start_time).format('MMMM Do YYYY, h:mm:ss a') }}
    </b>
    </Alert>

    <Alert v-if="task.taskuser.end_time" type="success" class="mb-2">End time <b>
      {{ moment(task.taskuser.end_time).format('MMMM Do YYYY, h:mm:ss a') }}
    </b>
    </Alert>

  </div>
</template>
<script setup>
import moment from "moment";

</script>

<script>
import {Alert} from 'flowbite-vue'

export default {
  components: {
    Alert: Alert,
  },
  props: [
    'task'
  ]
}
</script>

<style scoped>

</style>