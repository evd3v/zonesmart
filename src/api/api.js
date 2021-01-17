import axios from 'axios'
import store from '@/store'

export const config = {
    baseURL: process.env.VUE_APP_BASE_URL
}

export default class Api {
    constructor(options = {}) {
        this.client = options.client || axios.create(config)

        this.client.interceptors.request.use((config) => {
            if (!store.state.auth.access_token) {
                return config
            }

            const config_with_token = {
                headers: {},
                ...config
            }

            config_with_token.headers.Authorization =
                store.state.auth.access_token
            return config_with_token
        })

        this.client.interceptors.response.use(
            (r) => r,
            async (error) => {
                const request = error.config
                if (error.response.status !== 401) {
                    return Promise.reject(error)
                }

                if (!request.retry) {
                    request.retry = true
                    await store.dispatch('auth/refreshToken')
                    request.headers.Authorization =
                        store.state.auth.access_token
                    return this.client(request)
                }

                return Promise.reject(error)

                // refresh token
            }
        )
    }
}
