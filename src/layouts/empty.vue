<template lang="pug">
    .empty-layout
        router-view
</template>

<script>
export default {
    name: 'EmptyLayout'
}
</script>

<style scoped lang="scss">
.empty-layout {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
