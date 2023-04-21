<template>
  <div class="mt-2 p-2 border-2 rounded">
    <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
      <small>
        task is not assigned, assign it to a user below
      </small>
    </h5>
    <p>

      <label for="users" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an user to assign</label>
      <select id="users" @change="userAssigned($event)" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a user</option>
        <option v-for="user in users" :value="user.id">{{ user.name }}</option>
      </select>

    </p>
    <Input placeholder="enter task remarks " label="remarks" v-model="remarks"/>

    <div class="flex justify-end my-3">
      <button @click="assignTask" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Assign task
      </button>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import {Input} from "flowbite-vue";

export default {
  name: "unassignedTask",
  components: {
    Input: Input,
  },
  props: [
    'task'
  ],
  data() {
    return {
      users: [],
      user_id: null,
      remarks: 'remarks',
    }
  },
  mounted() {
    axios.get('https://solutech-tasks.test/api/users')
        .then((response) => {
          this.users = response.data.data;
        })
  },
  methods: {
    assignTask() {
      axios
          .post('https://solutech-tasks.test/api/user-tasks/', {
            remarks: this.remarks,
            user_id: this.user_id,
            task_id: this.task.id,
            due_date: this.task.due_date,
          })
          .then((response) =>this.$router.go())
    },
    userAssigned(event) {
      this.user_id = event.target.value
    }

  }
}
</script>

<style scoped>

</style>