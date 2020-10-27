<template>
    <div class="region-select-sec">

        <div class="dropdown" v-bind:class="{ open : isOpen }">
            <a href="#" class="btn btn-primary dropdown__btn"
               v-on-clickaway="away"
               @click.prevent="toggleDropdown"
               @keydown.space.exact.prevent="toggleDropdown"
            >
                {{selectTitle}}
                <fa-icon class="dropdown__icon" :icon="['fas', iconClass]"/>
            </a>
            <transition name="fade" appear>

                <ul class="dropdown__menu" v-if="isOpen">
                    <li v-for="(region , index) in regionsList" :key="index">
                        <a href="#" @click.prevent="selectRegion(region)">{{region.name}}</a>
                        <!--<router-link :to="'/region/'+region.slug" >{{region.name}}</router-link>-->
                    </li>
                </ul>
            </transition>
        </div>

    </div>
</template>

<script>
    import {mixin as clickaway} from 'vue-clickaway';
    import {capitalizeFirstLetter} from '../helper'

    export default {
        mixins: [clickaway],
        name: "RegionSelect",


        data() {
            return {
                iconClass: 'chevron-down',
                isOpen: false,
                selectTitle: 'Filter by Region',
                regionsList: this.regionListArr(this.$store.getters.getRegions)
            }
        },
        computed: {
            regions() {
                return this.regionListArr(this.$store.getters.getRegions);
            },
        },
        watch: {
            regions(newValue) {
                this.regionsList = newValue
            },
            isOpen() {
                if (this.isOpen) {
                    this.iconClass = 'chevron-up'
                } else {
                    this.iconClass = 'chevron-down'
                }
            },

        },
        mounted() {

            if (this.$route.params.slug && !this.$route.query.pageIndex) {
                // ovo je region adresa bex ?pageIndex=x

                const slug = this.$route.params.slug;

                const region = {name: capitalizeFirstLetter(slug), slug: slug};
                this.setSelected(region)
            } else if (this.$route.name === "Regio" && this.$route.query.pageIndex) {
                const slug = this.$route.params.slug;
                const region = {name: capitalizeFirstLetter(slug), slug: slug};
                this.setSelected(region, this.$route.query.pageIndex)
            }

        },

        methods: {

            setSelected(region, page_number = 0) {
                const regions = this.regionListArr(this.$store.getters.getRegions);
                console.log('page_number', page_number);
                let filteredRegionList = [];
                this.selectTitle = region.name;
                filteredRegionList = regions.filter((e) => {
                    return e.name !== region.name
                });
                filteredRegionList.unshift({name: 'Select all', slug: 'all'});
                this.setRegion(region.slug);

                this.$store.dispatch("getCountriesByRegion", this.$route.params.slug);
                this.$store.dispatch('pageNum', page_number);
                this.regionsList = filteredRegionList;
            },
            setRegion(region) {
                // this.$store.dispatch("getCountriesByRegion", region);

            },

            selectRegion(region) {
                this.toggleDropdown();

                const regions = this.regionListArr(this.$store.getters.getRegions);
                let filteredRegionList = [];

                if (region.slug !== 'all') {

                    this.$router.push({name: 'Region', params: {slug: region.slug}});
                    this.selectTitle = region.name;
                    // remove selected
                    filteredRegionList = regions.filter((e) => {
                        return e.name !== region.name
                    });
                    // add 'all' item
                    filteredRegionList.unshift({name: 'Select all', slug: 'all'});
                    this.setRegion(region.slug);
                    this.$store.dispatch("getCountriesByRegion", region.slug);

                } else {
                    this.$router.push({name: 'Home'});
                    this.selectTitle = 'Filter by Region';
                    filteredRegionList = regions;
                }
                this.$store.dispatch('pageNum', 0);
                this.regionsList = filteredRegionList;
            },
            toggleDropdown() {
                this.isOpen = !this.isOpen;
            },
            away: function () {
                this.isOpen = false;
            },
            regionListArr(getRegions) {
                let list = [];
                list = getRegions.map((item) => {
                    const slug = item.toLowerCase();
                    return {name: item, slug: slug}
                });
                return list;
            }
        }
    }
</script>

<style lang="scss">
    .dropdown {

        display: inline-block;
        position: relative;

    }

    .btn.dropdown__btn {

        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 56px;
        width: 200px;
        text-align: left;
        padding-left: 25px;
        padding-right: 25px;
        /*padding: 17px 25px;*/
    }

    .dropdown__icon {
        fill: var(--color-text);
    }

    .dropdown__menu {
        text-align: left;
        width: 100%;
        display: block;
        position: absolute;
        top: 62px;
        border-radius: 4px;
        padding: 10px 0;
        /*display: none;*/
        background-color: var(--color-bg);
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08), 0 3px 6px rgba(0, 0, 0, 0.15);
        /*background-color: red;*/
        a {
            color: var(--color-text);
            display: block;
            padding: 8px 25px;
            &:hover,
            &:focus {
                background-color: var(--color-text);
                color: var(--color-bg);
                .dropdown__icon {
                    fill: var(--color-bg);
                }
            }
        }
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: all .1s ease-out;
    }

    .fade-enter, .fade-leave-to {
        /*transition: all .25s ease-out;*/
        opacity: 0;
        /*background-color: red;*/

    }
</style>
