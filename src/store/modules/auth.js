import router from '@/router'

const Auth = {
    namespaced: true,
    state: {
        /** @type {string}
         * @description User access token */
        token: localStorage.getItem('token') || '',
        /** @type {Object}
         * @description User info
         * */
        user: null
    },
    actions: {
        /**
         * @param commit
         * @param {string} username
         * @param {string} password
         * @return {Promise<void>}
         */
        async login({ commit }, { username, password }) {
            // const { access_token } = await serviceRequest.login({
            //     username,
            //     password,
            // })
            // commit('setToken', access_token)
            // localStorage.setItem('auth_scheme', 'local')
        },
        async getProfile({ commit }) {
            // const profile = await coreRequest.getDoctorProfile()
            // commit('setUser', profile)
        },
        async logout({ commit }) {
            commit('removeToken')
            await router.go(0)
        }
    },
    mutations: {
        /**
         * @param state
         * @param {string} token
         */
        setToken(state, token) {
            state.token = `Bearer ${token}`
            localStorage.setItem('token', `Bearer ${token}`)
        },
        /**
         * @param state
         * @param {Object} profile
         */
        setUser(state, profile) {
            state.user = { ...profile }
        },
        removeToken(state) {
            state.token = ''
            localStorage.removeItem('token')
        }
    }
}

export default Auth
