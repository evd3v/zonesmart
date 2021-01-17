import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/auth',
        name: 'Auth',
        component: () => import('@/components/PathThrough'),
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/views/auth/Login'),
                meta: {
                    layout: 'auth'
                }
            }
        ]
    },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
