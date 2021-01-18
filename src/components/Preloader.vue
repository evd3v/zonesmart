<template lang="pug">
    .preloader(:data-big="big" :data-variant="variant")
        .dots
            .dot(v-for="dot in 3" :key="dot")
</template>

<script>
export default {
    name: 'Preloader',
    props: {
        big: {
            type: Boolean,
            default: false
        },
        variant: {
            type: String,
            default: 'primary'
        }
    }
}
</script>

<style lang="scss" scoped>
.preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    .dots {
        display: flex;

        .dot {
            width: 10px;
            height: 10px;
            background-color: var(--white);
            border-radius: 50%;
            transition: all 0.2s;
            animation: dot 1.5s infinite linear;
            opacity: 1;
            transform: scale(1);

            &:nth-child(2) {
                animation-delay: 0.3s;
            }

            &:nth-child(3) {
                animation-delay: 0.6s;
            }

            &:not(:last-child) {
                margin-right: 10px;
            }
        }

        @keyframes dot {
            0% {
                opacity: 1;
                transform: scale(1);
            }
            13.33% {
                opacity: 0;
                transform: scale(0.5);
            }
            40% {
                opacity: 0;
                transform: scale(0.5);
            }
            53.33% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 1;
                transform: scale(1);
            }
        }
    }

    &[data-big='true'] {
        .dot {
            width: 20px;
            height: 20px;
        }
    }

    &[data-variant='black'] {
        .dot {
            background-color: var(--primary-black);
        }
    }
}
</style>
