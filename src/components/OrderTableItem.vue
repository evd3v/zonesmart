<template lang="pug">
    .order-table-item
        .fields
            .field
                base-checkbox(v-model="selected_state.value")
            .field {{ order.order_id }}
            .field
                .field-expand(@click="expandItemHandler" :class="{expand: additional_state}")
                    cross-icon
                span {{ items_title }}
            .field {{ created_date }}
            .field -
            .field {{ order.is_paid }}
            .field {{ order.is_shipped }}
            .field {{ order.buyer }}
            .field -
            .field {{ price }}
        order-table-addition-table(v-if="additional_state"  :fields="order.items")
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox'
import OrderTableAdditionTable from '@/components/OrderTableAdditionTable'

import CrossIcon from '@/assets/images/svg/cross.svg?inline'
export default {
    name: 'OrderTableItem',
    components: { OrderTableAdditionTable, BaseCheckbox, CrossIcon },
    props: {
        order: {
            type: Object,
            required: true
        },
        value: {
            type: Object,
            required: true
        },
        isOrderSelected: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            additional_state: false,
            items_declination: ['товар', 'товаров', 'товара']
        }
    },
    computed: {
        created_date() {
            return this.order.create_date
                .split('T')[0]
                .split('-')
                .reverse()
                .join('.')
        },
        items_title() {
            return `${this.order.items.length} ${this.getItemDeclination()}`
        },
        price() {
            return new Intl.NumberFormat(navigator.language, {
                style: 'currency',
                currency: this.order.currency_code
            }).format(this.order.total_price)
        },
        selected_state: {
            get() {
                return this.value
            },
            set(value) {
                console.log(value)
                this.$emit('input', value)
            }
        }
    },
    watch: {
        isOrderSelected(value) {
            this.is_selected = value
        }
    },
    methods: {
        expandItemHandler() {
            this.additional_state = !this.additional_state
        },
        getItemDeclination() {
            const hundred_remainder = Math.abs(this.order.items.length) % 100
            const decimal_remainder = Math.abs(this.order.items.length) % 10
            if (hundred_remainder > 10 && hundred_remainder < 20)
                return this.items_declination[2]
            if (decimal_remainder > 1 && decimal_remainder < 5)
                return this.items_declination[1]
            if (decimal_remainder === 1) return this.items_declination[0]

            return this.items_declination[2]
        }
    }
}
</script>
