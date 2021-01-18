<template lang="pug">
    .base-input(:class="{'fixed-placeholder': is_placeholder_fixed}" :data-invalid="invalid")
        input(v-model="input_value" :type="input_type" @focus="focusHandler" @blur="blurHandler")
        .error-message(v-if="invalid")
            |   Введено некорректное значение
        .placeholder
            |   {{ placeholder }}
        .toggle-password-visibility(v-if="type === 'password'" @click="togglePasswordVisibility")
            component(:is="password_component")
</template>

<script>
import EyeOpenIcon from '@/assets/images/svg/eye-open.svg?inline'
import EyeClosedIcon from '@/assets/images/svg/eye-closed.svg?inline'

export default {
    name: 'BaseInput',
    components: { EyeClosedIcon, EyeOpenIcon },
    props: {
        value: {
            type: String,
            required: true
        },
        placeholder: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'text'
        },
        invalid: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            is_focused: false,
            is_password_showed: false
        }
    },
    computed: {
        input_value: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
        is_placeholder_fixed() {
            return this.input_value || this.is_focused
        },
        password_component() {
            return this.is_password_showed ? 'eye-closed-icon' : 'eye-open-icon'
        },
        input_type() {
            if (this.is_password_showed) return 'text'
            return this.type
        }
    },
    methods: {
        focusHandler() {
            this.is_focused = true
        },
        blurHandler() {
            this.is_focused = false
        },
        togglePasswordVisibility() {
            this.is_password_showed = !this.is_password_showed
        }
    }
}
</script>

<style lang="scss" scoped>
.base-input {
    position: relative;
    width: 100%;
    input {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        border: 1px solid var(--input-border-color);
        border-radius: 6px;
        font-size: 14px;
        transition: all ease-in-out 0.2s;
        &:focus {
            outline: none;
        }
    }
    &.fixed-placeholder {
        .placeholder {
            color: var(--input-border-color);
            top: -9px;
            font-size: 10px;
            padding: 2px;
            opacity: 1;
        }
    }
    .placeholder {
        top: 18px;
        left: 15px;
        position: absolute;
        opacity: 0.5;
        transition: all ease 0.2s;
        font-size: 14px;
        background: #fff;
        pointer-events: none;
        display: inline;
    }
    .toggle-password-visibility {
        position: absolute;
        top: 15px;
        right: 15px;
        &:hover {
            cursor: pointer;
        }
    }
    &[data-invalid='true'] {
        input {
            border-color: var(--error-red);
        }
    }
    .error-message {
        margin-top: 5px;
        color: var(--error-red);
        font-size: 10px;
    }
}
</style>
