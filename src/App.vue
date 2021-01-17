<template>
    <div id="app">
        <component :is="layout">
            <router-view />
        </component>
    </div>
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
