<template lang="pug">
    button(
        class="base-button"
        @click="clickHandler"
        :data-small="small"
        :data-variant="variant"
        :data-disabled="disabled"
        )
        preloader(v-if="loading")
        span(v-else)
            |   {{ label }}
</template>

<script>
import Preloader from '@/components/Preloader'
export default {
    name: 'BaseButton',
    components: { Preloader },
    props: {
        label: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: 'primary'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickHandler() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss" scoped>
.base-button {
    position: relative;
    width: 100%;
    height: 52px;
    border: none;
    padding: 0 10px;
    border-radius: 4px;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--white);
    transition: all ease-in-out 0.1s;
    &:active {
        transform: scale(0.95);
    }
    &:hover {
        cursor: pointer;
    }
    &:focus {
        outline: none;
    }

    &[data-small='true'] {
        height: 32px;
    }

    &[data-disabled='true'] {
        pointer-events: none;
        opacity: 0.8;
    }

    &[data-variant='primary'] {
        background-color: var(--accent-green);
    }

    &[data-variant='black'] {
        background-color: var(--primary-black);
    }
}
</style>
