import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('../views/Main.vue'),
        redirect: '/overview',
        children: [
            {
                path: '/overview',
                name: 'overview',
                component: () => import('../views/overview')
            },
            {
                path: '/user',
                name: 'user',
                component: () => import('../views/user')
            },
            {
                path: '/pay',
                name: 'pay',
                component: () => import('../views/pay')
            },
            {
                path: '/policy/home',
                name: 'home-policies',
                component: () => import('../views/policy/homePolicies')
            },
            {
                path: '/policy/auto',
                name: 'auto-policies',
                component: () => import('../views/policy/autoPolicies')
            },
            {
                path: '/assets/home',
                name: 'home',
                component: () => import('../views/assets/home')
            },
            {
                path: '/assets/vehicle',
                name: 'vehicle',
                component: () => import('../views/assets/vehicle')
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/register')
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router