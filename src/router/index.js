import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Signup from '@/components/Signup.vue'
import AddCompany from '@/components/AddCompany.vue'
import quotations from '@/components/AddEstimate'
import Customers from '@/components/Customers'
import products from '@/components/Products'
import services from '@/components/Services'
import store from '../store'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/signup',
            name: 'Signup',
            component: Signup
        },
        {
            path: '/home',
            name: 'Home',
            component: Home

        },
        {
            path: '/addcompany',
            name: 'AddCompany',
            component: AddCompany
        },
        {
            path: '/customers',
            name: 'customers',
            component: Customers
        },
        {
            path: '/quotations',
            name: 'quotations',
            component: quotations
        },
        {
            path: '/products',
            name: 'products',
            component: products
        },
        {
            path: '/services',
            name: 'services',
            component: services
        }

    ]
})