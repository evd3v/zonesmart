import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import guest from '@/router/middleware/guest'
import auth from '@/router/middleware/auth'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home'),
        meta: {
            middleware: [auth]
        }
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
                    layout: 'auth',
                    middleware: [guest]
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

router.beforeEach((to, from, next) => {
    const { middleware } = to.meta

    if (!middleware) {
        return next()
    }

    const context = {
        to,
        from,
        next,
        store
    }
    middleware[0](context)
})

export default router
