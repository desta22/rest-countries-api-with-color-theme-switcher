<template>
    <div class="home">

        <div class="country-list-nav">
            <Search></Search>
            <SelectRegion selectedSlug="all"></SelectRegion>
        </div>

        <div class="country-list__grid">
            <CountryBox v-if="countriesChunk"
                        v-for="country in countriesChunk" :key="country.alpha3Code"
                        :country="country">
            </CountryBox>
        </div>
        <Pagination></Pagination>
    </div>
</template>

<script>

    import CountryBox from '../components/CountryBox.vue'
    import Search from '../components/Search.vue'
    import SelectRegion from '../components/SelectRegion.vue'
    import Pagination from '../components/Pagination.vue'

    export default {
        name: 'Home',
        components: {
            Search,
            CountryBox,
            SelectRegion,
            Pagination
        },

        mounted() {
            if(this.$store.state.countries.countriesAll.length === 0){
                this.$store.dispatch("getCountries");
            }
            if ( this.$route.query.pageIndex > 0) {

                this.$store.dispatch('pageNum', this.$route.query.pageIndex - 1);
            } else {
                this.$store.dispatch('pageNum', 0);
            }
        },

        computed: {
            countriesChunk() {
                return this.$store.getters.getChunk(this.pageIndex)
            },
            pageIndex() {
                return this.$store.getters.getPageIndex
            }
        },
    }
</script>
<style lang="scss">
    .country-list-nav {
        margin-bottom: 50px;
    }

    .country-list-nav {
        display: block;
        @include mq('sm') {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }

    .country-list__grid {
        display: grid;
        grid-auto-rows: 1fr;
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
