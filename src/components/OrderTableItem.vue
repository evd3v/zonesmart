<template lang="pug">
    .order-table-item
        .fields
            .field
                base-checkbox(v-model="selected_state.value")
            .field
                |   {{ order.order_id }}
            .field
                .field-expand(@click="onExpandItem" :class="{expand: additional_state}")
                    cross-icon
                span
                    |   {{ items_title }}
            .field
                |   {{ created_date }}
            .field
                |   -
            .field(data-align="center")
                component(:is="getBooleanIcon(order.is_paid)")
            .field(data-align="center")
                component(:is="getBooleanIcon(order.is_shipped)")
            .field
                |   {{ order.buyer }}
            .field
                |   -
            .field(data-align="end")
                |   {{ price }}
        transition(name="smooth")
            order-table-addition-table(v-if="additional_state"  :fields="order.items")
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox'
import OrderTableAdditionTable from '@/components/OrderTableAdditionTable'

import CrossIcon from '@/assets/images/svg/cross.svg?inline'
import RoundIcon from '@/assets/images/svg/round.svg?inline'
import MarkedRoundIcon from '@/assets/images/svg/marked-round.svg?inline'

import {
    formatISODate,
    formatPriceCurrency,
    getItemDeclination
} from '@/helpers'

export default {
    name: 'OrderTableItem',
    components: {
        OrderTableAdditionTable,
        BaseCheckbox,
        CrossIcon,
        RoundIcon,
        MarkedRoundIcon
    },
    props: {
        order: {
            type: Object,
            required: true
        },
        value: {
            type: Object,
            required: true
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
            return formatISODate(this.order.create_date)
        },
        items_title() {
            return `${this.order.items.length} ${getItemDeclination(
                this.items_declination,
                this.order.items.length
            )}`
        },
        price() {
            return formatPriceCurrency(
                this.order.total_price,
                this.order.currency_code
            )
        },
        selected_state: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        onExpandItem() {
            this.additional_state = !this.additional_state
        },
        getBooleanIcon(value) {
            if (value) return 'marked-round-icon'
            return 'round-icon'
        }
    }
}
</script>
