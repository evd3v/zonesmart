<template lang="pug">
    #app
        transition(name="slide")
            component(:is="layout")
                router-view
</template>

<script>
import AuthLayout from '@/layouts/auth'
import DefaultLayout from '@/layouts/default'
import EmptyLayout from '@/layouts/empty'

export default {
    name: 'App',
    components: {
        AuthLayout,
        DefaultLayout,
        EmptyLayout
    },
    computed: {
        layout() {
            if (!this.$route.name) {
                return 'empty-layout'
            }
            return (this.$route.meta.layout || 'default') + '-layout'
        }
    }
}
</script>
