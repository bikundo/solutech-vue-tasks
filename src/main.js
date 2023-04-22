import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios";


const app = createApp(App)

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`


// use router
app.use(router)
app.use(store)
app.mount('#app')