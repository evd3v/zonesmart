import Api from '@/api/api'

export default class ZonesmartApi extends Api {
    constructor() {
        super()
    }

    /**
     * @param email
     * @param password
     * @return {Promise<{access: String, refresh: String}>}
     */
    async login(email, password) {
        const {
            data: { access, refresh }
        } = await this.client.post('/auth/jwt/create/', {
            email,
            password
        })
        return { access, refresh }
    }

    /**
     * @param {string} refresh_token
     * @return {Promise<{access: string}>}
     */
    async refreshToken(refresh_token) {
        const {
            data: { access }
        } = await this.client.post('/auth/jwt/refresh/', {
            refresh: refresh_token.slice(4)
        })
        return { access }
    }

    /**
     * @param {number=} limit
     * @param {number=} offset
     * @param {string=} search
     * @return {Promise<OrdersRequest>}
     */
    async getOrders({ limit, offset, search }) {
        const { data } = await this.client.get('/zonesmart/order/', {
            params: {
                limit,
                offset,
                search
            }
        })
        return data
    }
}
