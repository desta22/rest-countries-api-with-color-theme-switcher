<template>
    <div class="region">

        <div class="country-list-nav">
            <Search></Search>
            <SelectRegion :selectedSlug="$route.params.slug"></SelectRegion>
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
        name: "Region",
        components: {
            Search,
            CountryBox,
            SelectRegion,
            Pagination
        },
        data() {
            return {

            }
        },
        mounted() {
            if (this.$route.name === "Region" && this.$route.query.pageIndex) {
                this.$store.dispatch("getCountriesByRegion", this.$route.params.slug);
                this.$store.dispatch('pageNum', this.$route.query.pageIndex);
            } else if (this.$route.name === "Region") {
                this.$store.dispatch("getCountriesByRegion", this.$route.params.slug);
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

<style scoped>

</style>
