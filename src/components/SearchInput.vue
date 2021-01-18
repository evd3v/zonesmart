<template>
    <div class="search-input">
        <BaseInput
            v-model="search_value"
            :placeholder="placeholder"
            @input="onSearch"
        />
        <IconSearch />
    </div>
</template>

<script>
import IconSearch from '@/assets/images/svg/search.svg?inline'

import BaseInput from '@/components/BaseInput'

export default {
    name: 'SearchInput',
    components: {
        BaseInput,
        IconSearch
    },
    props: {
        placeholder: {
            required: true,
            type: String
        },
        searchFunction: {
            type: Function,
            required: true
        },
        params: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            deBounceTimeout: null,
            deBounce: 300
        }
    },
    computed: {
        search_value: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        }
    },
    methods: {
        onSearch(value) {
            this.$emit('input', value)
            clearTimeout(this.deBounceTimeout)
            this.deBounceTimeout = setTimeout(async () => {
                this.$emit('startSearch')
                const data = await this.searchFunction({
                    ...this.params
                })
                this.$emit('success', { data, value })
            }, this.deBounce)
        }
    }
}
</script>

<style lang="scss">
.search-input {
    width: 100%;
    position: relative;
    display: flex;

    input {
        outline: none;
        height: 52px;
        padding: 0 15px;
        border-radius: 6px;
        border: 1px solid var(--input-border-color);
        width: 100%;
    }
    svg {
        position: absolute;
        right: 15px;
        top: 15px;
    }
}
</style>
