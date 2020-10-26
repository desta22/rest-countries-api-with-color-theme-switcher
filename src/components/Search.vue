<template>
    <div class="search-sec">
        <fa-icon class="search__icon" :icon="['fas', 'search']"/>
        <input v-model="country"
               v-on-clickaway="away"
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
    </div>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway';

    export default {
        mixins: [clickaway],
        name: "Search",
        data() {
            return {
                country: '',
                filteredCountries: []
            }
        },
        computed: {
            countriesAll() {
                return this.$store.getters.getAllCountries
            }
        },
        methods: {
            filterCountries() {
                if (this.country.length >= 1) {
                    this.filteredCountries = this.countriesAll.filter((c) => {
                        return c.name.toLowerCase().startsWith(this.country.toLowerCase())
                    }).map((c) => {
                        return {"name": c.name, "slug": c.alpha3Code.toLowerCase()}
                    })
                } else {
                    this.filteredCountries = []
                }
            },
            away: function () {
                this.country = '';
                this.filteredCountries = []
            },
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
        padding-left: 75px;
        background-color: var(--color-bg);
        color: var(--color-text);
    }

    .search__icon {
        position: absolute;
        left: 30px;
        top: 20px;
        color: var(--color-text);
        opacity: .5;
    }
</style>
