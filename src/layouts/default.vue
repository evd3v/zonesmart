<template lang="pug">
    .default-layout
        router-view
</template>

<script>
export default {
    name: 'DefaultLayout'
}
</script>

<style lang="scss" scoped>
.default-layout {
    padding: 30px 30px 100px;
    background-color: var(--background-gray);
    min-height: 100vh;
}
</style>
