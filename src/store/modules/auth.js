import router from '@/router'
import { zonesmartRequest } from '@/api'

const Auth = {
    namespaced: true,
    state: {
        /** @type {string}
         * @description User access token
         */
        access_token: localStorage.getItem('access_token') ?? '',
        /** @type {string}
         * @description User refresh token
         */
        refresh_token: localStorage.getItem('refresh_token') ?? ''
    },
    actions: {
        /**
         * @param commit
         * @param {string} email
         * @param {string} password
         * @return {Promise<void>}
         */
        async login({ commit }, { email, password }) {
            const { access, refresh } = await zonesmartRequest.login(
                email,
                password
            )
            commit('SET_ACCESS_TOKEN', access)
            commit('SET_REFRESH_TOKEN', refresh)
            await router.replace('/')
        },
        async refreshToken({ commit, state }) {
            const { access } = await zonesmartRequest.refreshToken(
                state.refresh_token
            )
            commit('SET_ACCESS_TOKEN', access)
        },
        async logout({ commit }) {
            commit('CLEAR_TOKENS')
            await router.replace('/auth')
        }
    },
    mutations: {
        /**
         * @param state
         * @param {string} access_token
         */
        SET_ACCESS_TOKEN(state, access_token) {
            state.access_token = `JWT ${access_token}`
            localStorage.setItem('access_token', `JWT ${access_token}`)
        },
        /**
         * @param state
         * @param {string} refresh_token
         */
        SET_REFRESH_TOKEN(state, refresh_token) {
            state.refresh_token = refresh_token
            localStorage.setItem('refresh_token', `JWT ${refresh_token}`)
        },
        CLEAR_TOKENS(state) {
            state.access_token = ''
            state.refresh_token = ''
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }
}

export default Auth
