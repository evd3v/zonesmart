<template lang="pug">
    .login-page
        auth-card(:title="login_title")
            .content
                .field
                    base-input(v-model="username" placeholder="Email или телефон")
                .field
                    base-input(v-model="password" placeholder="Пароль" type="password")
                .error-message(v-if="error_message") {{error_message}}
                .btn-container
                    base-button(label="Войти")
</template>

<script>
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
            error_message: ''
        }
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
