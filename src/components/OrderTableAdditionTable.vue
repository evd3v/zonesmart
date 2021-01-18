<template lang="pug">
    .order-table-additional-table
        .table-item
            .table-fields
                .table-field(v-for="(field, index) in header_fields" :key="index") {{ field }}
        .table-content
            .table-item(v-for="(field, index) in fields" :key="index")
                .table-fields
                    .table-field
                        img(v-if="field.image" :src="field.image")
                        .table-field-description
                            .table-field-title {{ field.title }}
                            .table-field-info {{ field.sku }}
                    .table-field {{ field.quantity }}
                    .table-field -
                    .table-field {{ getPrice(field.price, field.currency)}}
                    .table-field {{ getPrice(field.total_price, field.currency)}}
</template>

<script>
export default {
    name: 'OrderTableAdditionTable',
    props: {
        fields: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            header_fields: [
                'Название/SKU',
                'Заказанное количество',
                'Отправленное количество',
                'Цена',
                'Стоимость'
            ]
        }
    },
    methods: {
        getPrice(price, currency) {
            return new Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: currency
            }).format(price)
        }
    }
}
</script>

<style lang="scss" scoped>
.order-table-additional-table {
    width: 100%;
    max-height: 250px;
    padding: 30px 20px 20px 60px;
    background-color: var(--background-gray);
    .table-content {
        margin-top: 5px;
        border-radius: 6px;
    }
    .table-item {
        .table-fields {
            display: flex;
            align-items: center;
            padding: 10px 35px;
            width: 100%;
            background: var(--white);
            .table-field {
                display: flex;
                align-items: center;
                flex: 0 0 calc(70% / 4);
                font-size: 12px;
                &:not(:last-child) {
                    margin-right: 10px;
                }
                &:first-child {
                    width: 30%;
                }

                img {
                    margin-right: 20px;
                }

                .table-field-description {
                    .table-field-title {
                        font-weight: 500;
                        font-size: 14px;
                        line-height: 125%;
                    }
                    .table-field-info {
                        margin-top: 3px;
                        opacity: 0.5;
                    }
                }
            }
        }
        &.header {
            .table-fields {
                background: none;
                .table-field {
                    opacity: 0.5;
                }
            }
        }
    }
}
</style>
