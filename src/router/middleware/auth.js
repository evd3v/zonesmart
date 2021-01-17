export default async function auth({ next, store }) {
    if (!store.state.auth.access_token) {
        return next({
            path: '/auth'
        })
    }

    return next()
}
