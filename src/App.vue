<template>
    <div id="app">
        <HeaderComp></HeaderComp>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>

    import HeaderComp from '@/components/HeaderComp.vue'

    export default {
        name: 'App',
        components: {
            HeaderComp
        },
        data() {
            return {
                allCountries: [],

            }
        },
        created() {
            if(this.$route.params.slug || this.$route.query.pageIndex){
            this.$store.dispatch("getCountryRegionsList");


            } else {
                this.$store.dispatch("getCountries");
            }
        },

    }
</script>

