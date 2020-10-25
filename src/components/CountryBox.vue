<template>
    <div class="country-box">
        <router-link :to="'/country/'+countryCode">
        <div class="flag">
            <img :src="country.flag" alt="">
        </div>
        <h3 class="name">{{country.name}}</h3>
        <p><strong>Population:</strong> {{country.population}}</p>
        <p><strong>Region:</strong> {{country.region}}</p>
        <p><strong>Capital:</strong> {{country.capital}}</p>
        </router-link>
    </div>
</template>

<script>
    export default {
        name: "CountryBox",
        props:["country"],
        computed:{
            countryCode:function () {
                return this.country.alpha3Code.toLowerCase()
            }
        }
    }
</script>

<style lang="scss" >
.name{
    font-size: 16px;
    font-weight: 800;

}
    p{
        font-size: 14px;
    }
</style>
