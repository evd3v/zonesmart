import Api from '@/api/api'

export default class ZonesmartApi extends Api {
    constructor() {
        super()
    }

    /**
     * @param username логин пользователя
     * @param password пароль пользователя
     * @return {Promise<{access: String, refresh: String}>}
     */
    async login(username, password) {
        const {
            data: { access, refresh }
        } = await this.client.post('/auth/jwt/create/', {
            email: username,
            password
        })
        return { access, refresh }
    }

    /**
     * @param {string} refresh_token refresh_token пользователя
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
     * @param {number=} limit лимит получаемых заказов
     * @param {number=} offset сдвиг получаемых заказов, от нуля
     * @param {string=} search строка поиска
     * @description возвращает список заказов
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
