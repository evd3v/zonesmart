<template lang="pug">
    .login-page
        auth-card(:title="login_title")
            .content
                .field
                    base-input(v-model="username" placeholder="Email или телефон" :invalid="$v.username.$dirty && $v.username.$invalid")
                .field
                    base-input(v-model="password" placeholder="Пароль" type="password" :invalid="$v.password.$dirty && $v.password.$invalid")
                .error-message(v-if="error_message") {{ error_message }}
                .btn-container
                    base-button(label="Войти" @click="loginHandler" :loading="isRequestSending")
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

import AuthCard from '@/components/AuthCard'
import BaseInput from '@/components/BaseInput'
import BaseButton from '@/components/BaseButton'
export default {
    name: 'Login',
    components: { BaseButton, BaseInput, AuthCard },
    data() {
        return {
            login_title: 'Вход',
            username: '',
            password: '',
            error_message: '',
            isRequestSending: false
        }
    },
    mounted() {
        this.$watch(
            (vm) => [vm.username, vm.password],
            () => (this.error_message = '')
        )
    },
    methods: {
        ...mapActions('auth', ['login']),
        async loginHandler() {
            this.$v.$touch()
            if (this.$v.$invalid) {
                return false
            }
            try {
                this.isRequestSending = true
                await this.login({
                    email: this.username,
                    password: this.password
                })
            } catch (e) {
                this.error_message = e.response.data.detail
            } finally {
                this.isRequestSending = false
            }
        }
    },
    validations: {
        username: { required },
        password: { required }
    }
}
</script>

<style lang="scss" scoped>
.content {
    margin-top: 10px;
    .field {
        margin-top: 30px;
    }
    .error-message {
        text-align: center;
        margin-top: 5px;
        color: var(--error-red);
        font-size: 12px;
    }
    .btn-container {
        margin-top: 30px;
    }
}
</style>
