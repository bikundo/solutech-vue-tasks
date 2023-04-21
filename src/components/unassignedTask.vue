<template>
  <div class="mt-2 p-2 border-2 rounded">
    <h5 class="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
      <small>
        task is not assigned, assign it to a user below
      </small>
    </h5>
    <p>

      <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an user to assign</label>
      <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option selected>Choose a user</option>
        <option v-for="user in users" value="user.id">{{user.name}}</option>

      </select>

    </p>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "unassignedTask",
  components: {},
  data() {
    return {
      users: [],
      user_id: '',
    }
  },
  mounted() {
    axios.get('https://solutech-tasks.test/api/users')
        .then((response) => {
          this.users = response.data.data;
        })
  }
}
</script>

<style scoped>

</style>