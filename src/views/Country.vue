<template>
    <div>
        <div class="country-nav">
            <a href="#" class="btn btn-primary" @click.prevent="$router.go(-1)">
                <fa-icon class="country-nav__icon" :icon="['fas', 'arrow-left']"/>
                Back
            </a>
        </div>

        <div v-if="country" class="country__grid">
            <div class="country__flag">
                <img :src="country.flag" alt="">
            </div>
            <div>

                <h1 class="country-page__title">{{country.name}}</h1>

                <div class="country-data">
                    <div class="country-data__col">
                        <p><strong>Native Name: </strong>{{country.nativeName}}</p>
                        <p><strong>Population: </strong>{{country.population}}</p>
                        <p><strong>Region: </strong>{{country.region}}</p>
                        <p><strong>Sub Region: </strong>{{country.subregion}}</p>
                        <p><strong>Capital: </strong>{{country.capital}}</p>
                    </div>
                    <div class="country-data__col">
                        <p><strong>Top Level Domain: </strong>
                            <span v-for="(domain, index) in country.topLevelDomain"
                                  :key="index">
                                <span v-if="index !== 0">, </span> {{domain}}
                            </span>
                        </p>
                        <p><strong>Currencies: </strong>
                            <span v-for="(currency, index) in country.currencies"
                                  :key="currency.code">
                                <span v-if="index !== 0">, </span> {{currency.name}} </span>
                        </p>
                        <p><strong>Languages: </strong>
                            <span v-for="(language, index) in country.languages"
                                  :key="index">
                                <span v-if="index !== 0">, </span> {{language.name}} </span>
                        </p>
                    </div>
                </div>

                <div class="borders__sec">
                    <h4 class="borders__sec-title">Border countries: </h4>
                    <div v-if="country.borders.length>0">
                        <router-link class="btn btn-primary borders__btn small"
                                     v-for="(border, index) in country.borders"
                                     :key="index" :to="'/country/' + get_country(border).slug">
                            {{get_country(border).name}}
                        </router-link>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Country",
        computed: {
            country() {
                const alpha3Code = this.$route.params.alpha3Code.toUpperCase();
                return this.$store.getters.getCountryById(alpha3Code)
            },
        },
        methods: {
            get_country(code) {
                const country = this.$store.getters.getCountryById(code);
                const slug = country.alpha3Code.toLowerCase();
                return {name: country.name, slug: slug}
            }
        }
    }
</script>

<style lang="scss">
    .country-nav {
        padding: 20px 0 80px 0;
    }

    .country__flag {
        margin-bottom: 50px;
        @include mq('md') {
            margin-bottom: 0;
        }
    }

    .country-page__title {
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 40px;
        @include mq('md') {
            margin-left: 35px;

        }
    }

    .country-nav__icon {
        margin-right: 10px;
    }

    .country-data {
        @include mq('md') {

            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
        font-size: 16px;
        margin-bottom: 60px;
        p {
            margin-bottom: 15px;
        }

    }

    .country-data__col {
        @include mq('md') {
            padding-left: 35px;

        }
    }

    .country__grid {
        @include mq('md') {

            display: grid;
            column-gap: 80px;
        }

        @include mq('md') {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    .borders__sec {
        margin-bottom: 60px;
        @include mq('md') {
            margin-bottom: 0;
            margin-left: 35px;
            display: flex;
        }
    }

    .borders__sec-title {
        white-space: nowrap;
        padding-top: 10px;
        font-weight: 600;
        margin-right: 20px;
        margin-bottom: 20px;
        @include mq('md') {
            margin-bottom: 0;
        }
    }

    .borders__btn {
        margin-bottom: 10px;
        margin-right: 10px;
    }
</style>
