<template lang="pug">
    .auth-layout
        .logo
            img(:src="logo_img")
        router-view
        .rights
            | © 2020 ООО «ЗОНСМАРТ». Все права защищены.
</template>

<script>
export default {
    name: 'AuthLayout',
    data() {
        return {
            logo_img: require('@/assets/images/logo-light-bg.png')
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-layout {
    padding-top: 60px;
    padding-bottom: 40px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .logo {
        margin-bottom: 105px;
    }
    .rights {
        margin-top: auto;
        mix-blend-mode: normal;
        opacity: 0.4;
        font-size: 13px;
        line-height: 15px;
        letter-spacing: -0.1625px;
    }
}
</style>
