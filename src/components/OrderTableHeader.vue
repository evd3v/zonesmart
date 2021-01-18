<template lang="pug">
 .order-table-header(class="order-table-item")
     .fields
         .field
             base-checkbox(v-model="is_all_fields_selected")
         template(v-if="!actionBar")
            .field(v-for="(field, index) in fields" :key="index")
                span {{ field }}
         .action-bar(v-else)
            span(@click="onPrint") Распечатать инвойс
</template>

<script>
import BaseCheckbox from '@/components/BaseCheckbox'
export default {
    name: 'OrderTableHeader',
    components: { BaseCheckbox },
    props: {
        value: {
            type: Boolean,
            required: true
        },
        fields: {
            type: Array,
            required: true
        },
        actionBar: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        is_all_fields_selected: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        onPrint() {
            this.$emit('print')
        }
    }
}
</script>

<style lang="scss" scoped>
.order-table-header {
    &:after {
        display: none;
    }
    .fields {
        .field {
            &:not(:first-child) {
                opacity: 0.5;
            }
        }
    }
    .action-bar {
        span {
            font-size: 14px;
            color: var(--accent-green);
            font-weight: 500;
            &:hover {
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
}
</style>
