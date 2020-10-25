<template>
    <div class="home">
        <div class="country-list-nav">
            <Search></Search>
            <RegionSelect></RegionSelect>
        </div>
        <div class="country-list__grid">

            <CountryBox v-if="countriesChunk"
                        v-for="country in countriesChunk" :key="country.alpha3Code"
                        :country="country">
            </CountryBox>
        </div>
    </div>
</template>

<script>

    import CountryBox from '@/components/CountryBox.vue'
    import Search from '@/components/Search.vue'
    import RegionSelect from '@/components/RegionSelect.vue'

    export default {
        name: 'Home',
        components: {
            Search,
            CountryBox,
            RegionSelect
        },
        data() {
            return {}
        },
        computed: {
            countriesChunk() {
                return this.$store.getters.getChunk(2)
            }

        },


    }
</script>
<style lang="scss">
    .country-list-nav{
        margin-bottom: 50px;
    }
    .country-list-nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .country-list__grid {
        display: grid;
        column-gap: 60px;
        row-gap: 60px;
        @include mq('sm') {
            grid-template-columns: repeat(2, 1fr);
        }
        @include mq('md') {
            grid-template-columns: repeat(3, 1fr);
        }
        @include mq('lg') {
            grid-template-columns: repeat(4, 1fr);
        }
    }

</style>
