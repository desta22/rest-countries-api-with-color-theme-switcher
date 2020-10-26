<template>
    <div id="app">
        <HeaderComp></HeaderComp>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>

    // @ is an alias to /src
    import HeaderComp from '@/components/HeaderComp.vue'

    export default {
        name: 'App',
        components: {
            HeaderComp
        },
        data() {
            return {
                allCountries: [],
                // isDark: false,
            }
        },
        created() {
            this.$store.dispatch("getCountries");
        },
        methods: {
            // toggleMode(){
            //     this.isDark = !this.isDark
            // }
        }
    }
</script>

