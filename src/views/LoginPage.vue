<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Sign in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" action="javascript:void(0)">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
              <input type="email" name="email" v-model="auth.email" id="email"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                     placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input type="password" v-model="auth.password" name="password" id="password" placeholder="••••••••"
                     class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>

            <button type="submit" @click="login" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
              {{ processing ? "Please wait..." : "Login" }}
            </button>
          </form>
          <Alert v-if="message != null" type="danger" class="mb-2">
            <b>
              {{ message }}
            </b>
          </Alert>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import {Alert} from "flowbite-vue";
import axios from "axios";
import {mapActions} from 'vuex'


export default {
  components: {Alert},
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      message: null,
      processing: false
    }
  },
  methods: {
    ...mapActions({
      signIn: 'auth/login'
    }),
    async login() {
      this.processing = true
      await axios.get('/sanctum/csrf-cookie')
      await axios.post('/api/login', this.auth).then((data) => {
        const payload = data.data;
        console.log(payload)
        this.signIn(payload)
      }).catch((data) => {
        console.log(data)
        this.message = data.response.data.message
      }).finally(() => {
        this.processing = false
      })
    },
  },
}
</script>

<style scoped>

</style>