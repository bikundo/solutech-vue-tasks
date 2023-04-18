<script setup>
import {Navbar, NavbarLogo, NavbarCollapse, NavbarLink, TheCard} from 'flowbite-vue'

</script>
<template>
  <Navbar>
    <template #logo>
      <NavbarLogo link="https://www.google.com/" alt="Flowbite logo" image-url="https://flowbite.com/docs/images/logo.svg">
        Tasks
      </NavbarLogo>
    </template>
    <template #default="{isShowMenu}">
      <NavbarCollapse :isShowMenu="isShowMenu">
        <NavbarLink isActive link="#">Home</NavbarLink>
        <NavbarLink link="#">Services</NavbarLink>
        <NavbarLink link="#">Pricing</NavbarLink>
        <NavbarLink link="#">Contact</NavbarLink>
      </NavbarCollapse>
      <div class="container">
        <the-card v-for="task in tasks" href="#" class="mb-2.5">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{{ task.name }}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">
            {{ task.description }}
          </p>
        </the-card>
      </div>
    </template>
  </Navbar>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tasks: []
    }
  },
  mounted() {
    axios
        .get('https://solutech-tasks.test/api/tasks')
        .then((response) => {
          this.tasks = response.data.data
          console.log(response.data.data)
        })
  }
}
</script>

