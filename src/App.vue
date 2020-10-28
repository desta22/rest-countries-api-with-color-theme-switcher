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



    }
</script>

