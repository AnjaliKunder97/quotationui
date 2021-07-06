// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import { ClientTable } from 'vue-tables-2';
Vue.use(ClientTable);
import Vuetable from 'vuetable-2'
Vue.use(Vuetable)

import './assets/css/bootstrap.min.css'
import './assets/css/theme.min.css'
import './assets/css/light-cyan.css'
import './assets/css/custom.css'
import './assets/css/style.min.css'
import './assets/css/global-plugins.min.css'

axios.defaults.baseURL = 'http://35.225.127.81/quotation'
axios.defaults.headers.get['Accepts'] = 'application/json'
    // const token = store.getters.token
    // if (store.getters.isAuthenticated) {
    // const token = store.state.user.token
    // console.log(token);
    // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // }
const reqInterceptor = axios.interceptors.request.use(config => {
    // const token = store.getters.token
    // console.log('Request Token', token)
    // if (token) {
    //     config.headers.common['Authorization'] = `Bearer ${token}`;
    //         // axios.defaults.headers.post['Authorization'] = `Bearer ${token}`
    // }
    console.log('Request Interceptor', config)
    return config
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
})

const resInterceptor = axios.interceptors.response.use(res => {
    console.log('Response Interceptor', res)
    return res
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
})

axios.interceptors.request.eject(reqInterceptor)
axios.interceptors.response.eject(resInterceptor)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})