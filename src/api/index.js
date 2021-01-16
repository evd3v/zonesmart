import axios from 'axios'
import store from '@/store'

export const config = {
    baseURL: process.env.VUE_APP_BASE_URL
}

export default class Api {
    constructor(options = {}) {
        this.client = options.client || axios.create(config)

        this.client.interceptors.request.use((config) => {
            if (!store.state.auth.token) {
                return config
            }

            const config_with_token = {
                headers: {},
                ...config
            }

            config_with_token.headers.Authorization = store.state.auth.token
            return config_with_token
        })

        this.client.interceptors.response.use(
            (r) => r,
            async (error) => {
                if (
                    error.response.status !== 401 &&
                    error.response.status !== 403
                ) {
                    return Promise.reject(error)
                }
                await store.dispatch('auth/logout')
            }
        )
    }
}