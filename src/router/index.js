import {createRouter, createWebHistory} from 'vue-router'
import home from "../views/Home.vue";
import LoginPage from "../views/LoginPage.vue";

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes: [
        {
            path: '/',
            component: home,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/login',
            component: LoginPage,
            meta: {
                guest: true
            }
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('token') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (localStorage.getItem('token') == null) {
            next()
        } else {
            next('/')
        }
    } else {
        next()
    }
})


export default router
