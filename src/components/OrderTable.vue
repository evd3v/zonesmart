<template lang="pug">
    .order-table
        .header
            .title
                | Таблица заказов
            .btn-container
                base-button(label="Отправления" small disabled variant="black")
                base-button(label="Экспортировать" small disabled)
        .subheader
            .btn-container
                base-button(label="Фильтр" disabled variant="black")
            search-input(
                placeholder="Поиск"
                v-model="search_string"
                :params="search_params"
                :searchFunction="search_function"
                @success="onSearch"
                @startSearch="onStartSearch"
                )
        template(v-if="!is_fetching")
            .table
                order-table-header(
                    :fields="table_fields"
                    v-model="is_all_orders_selected"
                    :action-bar="Boolean(selected_orders_ids.length)"
                    @print="onPrint"
                    )
                .table-content
                    order-table-item(
                        v-for="(order, index) in orders.results"
                        v-model="selected_orders[index]"
                        :key="order.id"
                        :order="order"
                        )
                        | {{ order }}
            .pagination-container
                left-arrow-icon(@click="prevPage" :class="{disabled: current_page === 0}")
                span
                    |   {{limit * current_page}}
                    |   -
                    |   {{ is_current_page_last ? orders.count : limit * (current_page + 1) }}
                span
                    |   из {{ orders.count }}
                right-arrow-icon(@click="nextPage" :class="{disabled: is_current_page_last}")
        preloader(v-else big variant="black")
</template>

<script>
import { zonesmartRequest } from '@/api'

import BaseButton from '@/components/BaseButton'
import SearchInput from '@/components/SearchInput'
import BaseCheckbox from '@/components/BaseCheckbox'

import CrossIcon from '@/assets/images/svg/cross.svg?inline'
import LeftArrowIcon from '@/assets/images/svg/left-arrow.svg?inline'
import RightArrowIcon from '@/assets/images/svg/right-arrow.svg?inline'
import OrderTableItem from '@/components/OrderTableItem'
import OrderTableHeader from '@/components/OrderTableHeader'
import Preloader from '@/components/Preloader'

export default {
    name: 'OrderTable',
    components: {
        Preloader,
        OrderTableHeader,
        OrderTableItem,
        BaseCheckbox,
        SearchInput,
        BaseButton,
        CrossIcon,
        LeftArrowIcon,
        RightArrowIcon
    },
    data() {
        return {
            is_all_orders_selected: false,
            selected_orders: [],
            table_fields: [
                { name: 'ID' },
                { name: 'Товары' },
                { name: 'Дата заказа' },
                { name: 'Статус' },
                { name: 'Оплачено', align: 'center' },
                { name: 'Доставлено', align: 'center' },
                { name: 'Покупатель' },
                { name: 'Метод доставки' },
                { name: 'Стоимость', align: 'end' }
            ],
            orders: [],
            limit: 10,
            current_page: 0,
            search_string: '',
            search_function: zonesmartRequest.getOrders.bind(zonesmartRequest),
            is_fetching: false
        }
    },
    computed: {
        search_params() {
            return {
                limit: this.limit,
                search: this.search_string,
                offset: 0
            }
        },
        selected_orders_ids() {
            return this.selected_orders.filter((order) => order.value)
        },
        is_current_page_last() {
            return (this.current_page + 1) * this.limit >= this.orders.count
        }
    },
    watch: {
        is_all_orders_selected(value) {
            this.selected_orders = this.selected_orders.map((order) => ({
                ...order,
                value
            }))
        }
    },
    async mounted() {
        await this.getOrders()
    },
    methods: {
        async getOrders() {
            this.is_fetching = true
            const offset = this.current_page * this.limit
            this.is_all_orders_selected = false
            this.orders = await zonesmartRequest.getOrders({
                limit: this.limit,
                offset,
                search: this.search_string
            })
            this.selected_orders = this.orders.results.map((order) => ({
                id: order.id,
                value: false
            }))
            this.is_fetching = false
        },
        async nextPage() {
            this.current_page++
            await this.getOrders()
        },
        async prevPage() {
            this.current_page--
            await this.getOrders()
        },
        onStartSearch() {
            this.is_fetching = true
            this.orders = []
            this.current_page = 0
        },
        onSearch({ data }) {
            this.orders = data
            this.selected_orders = this.orders.results.map((order) => ({
                id: order.id,
                value: false
            }))
            this.is_fetching = false
        },
        onPrint() {
            console.log(
                `Распечатываю инвойс [${this.selected_orders_ids.map(
                    (item) => item.id
                )}]`
            )
        }
    }
}
</script>

<style lang="scss" scoped>
.order-table {
    display: flex;
    flex-direction: column;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title {
            font-weight: 500;
            font-size: 36px;
        }
        .btn-container {
            display: flex;
            button:first-child {
                margin-right: 10px;
            }
        }
    }
    .subheader {
        margin-top: 30px;
        display: flex;
        .btn-container {
            margin-right: 30px;
        }
    }
    .table {
        margin-top: 20px;
        .table-content {
            display: flex;
            flex-direction: column;
            margin-top: 10px;
            border-radius: 6px;
        }
    }

    .preloader {
        margin-top: 40px;
    }

    .pagination-container {
        display: flex;
        margin-left: auto;
        align-items: center;
        margin-top: 30px;
        opacity: 0.5;
        span {
            margin: 0 5px;
        }
        svg {
            &:hover {
                cursor: pointer;
            }
            &.disabled {
                pointer-events: none;
                opacity: 0.5;
            }
        }
    }
}
</style>
