<template>
    <div class="search-sec">
        <input v-model="country"
               @input="filterCountries"
               class="search__input form-control"
               type="text" placeholder="Search for country">
        <div v-if="filteredCountries.length>0">
            <ul class="search__results">
                <li class="search__result" v-for="item in filteredCountries" :key="item.slug">
                    <router-link class="search__result-link" :to="'/country/'+ item.slug">{{item.name}}</router-link>
                </li>
            </ul>
        </div>
        <!--{{filteredCountries}}-->
    </div>
</template>

<script>
    export default {
        name: "Search",
        data() {
            return {
                country: '',
                filteredCountries: []
                // states:''
            }
        },
        computed: {
            countriesAll() {
                return this.$store.getters.getAllCountries
            }
        },
        methods: {
            filterCountries() {
                this.filteredCountries = this.countriesAll.filter((c) => {
                    return c.name.toLowerCase().startsWith(this.country.toLowerCase())
                }).map((c) => {
                    return {"name": c.name, "slug": c.alpha3Code.toLowerCase()}
                })
            }
        }
    }
</script>

<style lang="scss">
    .search-sec {
        position: relative;
    }

    .search__results {
        text-align: left;
        width: 100%;
        display: block;
        position: absolute;
        top: 62px;
        border-radius: 4px;
        padding: 10px 0;
        background-color: var(--color-bg);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15);

    }

    .search__result-link {
        color: var(--color-text);
        display: block;
        padding: 8px 25px;
        &:hover,
        &:focus {
            background-color: var(--color-text);
            color: var(--color-bg);
        }
    }

    .search__btn {
        position: absolute;
    }

    .search__input {
        padding-left: 100px;
    }
</style>
