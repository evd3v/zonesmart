<template lang="pug">
    .base-checkbox
        input(v-model="checkbox_value" type="checkbox")
        check-icon
</template>

<script>
import CheckIcon from '@/assets/images/svg/check.svg?inline'

export default {
    name: 'BaseCheckbox',
    components: { CheckIcon },
    props: {
        value: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        checkbox_value: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.base-checkbox {
    position: relative;
    height: 24px;
    input[type='checkbox'] {
        height: 24px;
        width: 24px;
        border: 1px solid var(--input-border-color);
        border-radius: 3px;
        appearance: none;
        margin: 0;
        &:hover {
            cursor: pointer;
        }
        &:focus {
            outline: none;
        }
        &:checked {
            &:after {
                display: none;
            }
            + svg {
                opacity: 1;
            }
        }
    }
    svg {
        position: absolute;
        top: 6px;
        left: 3px;
        opacity: 0;
        transition: all ease-in-out 0.2s;
        pointer-events: none;
    }
}
</style>
