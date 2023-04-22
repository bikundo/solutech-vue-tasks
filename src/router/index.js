import {createRouter, createWebHistory} from 'vue-router'
import home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/login',
            component: LoginPage
        }
    ]
})

export default router
