import axios from 'axios'
import router from '../router'

export default {
    namespaced: true,
    state: {
        authenticated: false,
        token: null,
        user: {}
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        token(state) {
            return state.token
        }
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value
        },
        SET_USER(state, value) {
            state.user = value
        },
        SET_TOKEN(state, value) {
            state.token = value
        }
    },
    actions: {
        login(store, payload) {
            store.commit('SET_USER', payload.user)
            store.commit('SET_AUTHENTICATED', true)
            store.commit('SET_TOKEN', payload.token)
            localStorage.setItem("token", payload.token);

            router.push('/')
        },
        logout({commit}) {
            commit('SET_USER', {})
            commit('SET_AUTHENTICATED', false)
            commit('SET_TOKEN', null)
            localStorage.removeItem("token");
        }
    }
}