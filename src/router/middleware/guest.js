export default function guest({ next, to, store }) {
    if (to.path.includes('/auth') && store.state.auth.access_token) {
        return next({
            path: '/'
        })
    }
    if (!to.path.includes('/auth')) {
        return next({
            path: '/auth'
        })
    }
    return next()
}
