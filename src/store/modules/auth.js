import router from '@/router'
import { zonesmartRequest } from '@/api'

const Auth = {
    namespaced: true,
    state: {
        /** @type {string}
         * @description access_token пользователя
         */
        access_token: localStorage.getItem('access_token') ?? '',
        /** @type {string}
         * @description refresh_token пользователя
         */
        refresh_token: localStorage.getItem('refresh_token') ?? ''
    },
    actions: {
        /**
         * @param commit
         * @param {string} username логин пользователя
         * @param {string} password
         * @description Производит логин в сервис
         * @return {Promise<void>}
         */
        async login({ commit }, { username, password }) {
            const { access, refresh } = await zonesmartRequest.login(
                username,
                password
            )
            commit('SET_ACCESS_TOKEN', access)
            commit('SET_REFRESH_TOKEN', refresh)
            await router.replace('/')
        },
        /**
         * @param commit
         * @param state
         * @description Производит обновление токена
         * @return {Promise<void>}
         */
        async refreshToken({ commit, state }) {
            const { access } = await zonesmartRequest.refreshToken(
                state.refresh_token
            )
            commit('SET_ACCESS_TOKEN', access)
        },
        /**
         * @param commit
         * @description Производит разлогин из сервиса
         * @return {Promise<void>}
         */
        async logout({ commit }) {
            commit('CLEAR_TOKENS')
            await router.replace('/auth')
        }
    },
    mutations: {
        /**
         * @param state
         * @param {string} access_token
         * @description Устанавливает access_token в стей и localStorage
         */
        SET_ACCESS_TOKEN(state, access_token) {
            state.access_token = `JWT ${access_token}`
            localStorage.setItem('access_token', `JWT ${access_token}`)
        },
        /**
         * @param state
         * @param {string} refresh_token
         * @description Устанавливает refresh_token в стейт и localStorage
         */
        SET_REFRESH_TOKEN(state, refresh_token) {
            state.refresh_token = refresh_token
            localStorage.setItem('refresh_token', `JWT ${refresh_token}`)
        },
        /**
         * @param state
         * @description Очищает токены из стейта и localStorage
         */
        CLEAR_TOKENS(state) {
            state.access_token = ''
            state.refresh_token = ''
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
        }
    }
}

export default Auth
