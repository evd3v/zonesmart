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
}
