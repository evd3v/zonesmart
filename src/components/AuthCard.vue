<template lang="pug">
    .auth-card
        .title {{title}}
        slot
</template>

<script>
export default {
    name: 'AuthCard',
    props: {
        title: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.auth-card {
    padding: 40px 50px;
    box-shadow: 0 14px 64px rgba(48, 56, 64, 0.16);
    border-radius: 6px;
    background-color: var(--white);
    width: 400px;
    .title {
        text-align: center;
        font-weight: 500;
        font-size: 36px;
        line-height: 120%;
    }
}
</style>
