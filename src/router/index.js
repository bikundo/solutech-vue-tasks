import { createRouter, createWebHistory } from 'vue-router'
import home from "../views/Home.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: home
        },
        // {
        //     path: '/user',
        //     component: UsersPage
        // }
    ]
})

export default router
