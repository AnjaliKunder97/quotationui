import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import axios from 'axios'
import router from './router'
Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        })
    ],
    state: {
        user: {
            userId: null,
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            phoneNumber: '',
            address: '',
            isAdmin: '',
            company: [],
            token: "",
            activeCompany: '',
        },
    },
    mutations: {
        authUser(state, userData) {
            // state.user.token = userData.token
            state.user.userId = userData.userId
            state.user.username = userData.username
            state.user.firstName = userData.firstName
            state.user.lastName = userData.lastName
            state.user.phoneNumber = userData.phoneNumber
            state.user.company = userData.company
            state.user.email = userData.email
            state.user.token = userData.token

        },
        addCompany(state, userData) {
            state.user.company = userData.company
        },
        clearAuthData(state) {
            state.user.token = null
        },
        setCompany(state, company) {
            state.user.activeCompany = company
        },
        setToken(state, token) {
            state.user.token = token
        }
    },
    actions: {
        signup({ commit, dispatch }, authData) {
            axios.post('/users/register/', {
                    user_name: authData.username,
                    password: authData.password,
                    company: authData.companyName,
                    first_name: authData.firstName,
                    last_name: authData.lastName,
                    phone: authData.phoneNumber,
                    email: authData.email,
                })
                .then(res => {
                    console.log(res)
                    commit('authUser', {
                        username: res.data.user_name,
                        userId: res.data.user_Id,
                        company: res.data.company,
                        firstName: res.data.first_name,
                        lastName: res.data.last_name,
                        phoneNumber: res.data.phone,
                        email: res.data.email,
                    })
                }).catch(error => (console.log(error)))
            dispatch('login', { username: authData.username, password: authData.password })
        },
        login({ commit }, authData) {
            axios.post('/users/login/', {
                username: authData.username,
                password: authData.password
            }).then(res => {
                console.log(res)
                commit('authUser', {
                    firstName: res.data.first_name,
                    lastName: res.data.last_name,
                    email: res.data.email,
                    phoneNumber: res.data.phone_number,
                    token: res.data.token,
                    isAdmin: res.data.is_admin,
                    company: res.data.companies,
                })
            }).catch(error => (console.log(error)))

        },
        switch ({ commit }, company) {
            // this.state.user.activeCompany = company
            commit('setCompany', company)
            axios.post('users/switch_company/', { company_to: company }, {
                headers: {
                    'Authorization': 'Bearer ' + this.state.user.token
                }
            }).then(res => {
                console.log(res)
                commit('setToken', res.data.token)
            }).catch(error => (console.log.error))

        },
        //add new company 
        addCom({ commit }, data) {
            axios.post('/users/new_company/', {
                    company: data.newcompany
                        //  }, { headers: { 'Authorization': 'Bearer ' + this.state.user.token 
                        // } 
                })
                .then(res => {
                    console.log(res)
                    commit('addCompany', {
                        company: res.data.company
                    })
                }).catch(error => (console.log.error))
        },
        logout({ commit }) {
            axios.post('/users/logout/', {},

                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.state.user.token
                        }
                    })
                .then(res => {
                    console.log(res)
                    commit('clearAuthData')
                    router.replace('/')
                }).catch(error => (console.log.error))

        },


    },
    getters: {
        isAuthenticated(state) {
            return state.user.token !== ""
        },
        sendCompanies(state) {
            return state.user.company
        },
        token(state) { return state.user.token }
    }
})