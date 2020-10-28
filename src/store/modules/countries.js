import axios from 'axios'

function chunkArray(arr, chunk_size) {
    var myArray = [...arr];
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}


function extractRegions(allCountries) {
    let arr = [...new Set(allCountries.map(country => country.region))];
    return arr.filter((e) => {
        return e !== ''
    })
}

const countries = {

    state: {

        countriesAll: [],
        countriesChunk: [],
        // regions: [],

        chunkNumbers: 0,
        pageIndex: 0,

        // statesNames:[],
    },
    getters: {
        getChunksNumber(state) {
            return state.countriesChunk.length
        },
        getChunk: (state) => (page_num) => {
            return state.countriesChunk[page_num];
        },
        getCountryById: (state) => (id) => {
            return state.countriesAll.find(country => country.alpha3Code === id);
        },
        // getRegions(state) {
        //     return state.regions
        // },
        getAllCountries(state) {
            return state.countriesAll;
        },
        getPageIndex(state) {
            return state.pageIndex
        }
    },
    mutations: {
        SET_ALL_COUNTRIES(state, data) {
            state.countriesAll = data
        },
        // SET_ALL_REGIONS(state, data) {
        //     state.regions = data
        // },
        SET_COUNTRIES_CHUNK(state, data) {
            state.countriesChunk = data
        },
        SET_PAGE_NUMBER(state, data) {
            state.pageIndex = data
        }
    },
    actions: {
        getCountriesByRegion({commit}, region) {
            axios
                .get('https://restcountries.eu/rest/v2/region/' + region)
                .then(res => {
                    commit('SET_COUNTRIES_CHUNK', chunkArray(res.data, 8));
                })
                .catch(err => {
                    console.log(err);
                })
        },
        getCountries({commit}) {
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(res => {

                    commit('SET_ALL_COUNTRIES', res.data);
                    // commit('SET_ALL_REGIONS', extractRegions(res.data));
                    commit('SET_COUNTRIES_CHUNK', chunkArray(res.data, 8));
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // getCountryRegionsList({commit}){
        //     axios
        //         .get('https://restcountries.eu/rest/v2/all')
        //         .then(res => {
        //             commit('SET_ALL_REGIONS', extractRegions(res.data));
        //         })
        //         .catch(err => {
        //             console.log(err);
        //         })
        // },
        pageNum({commit}, num) {
            commit('SET_PAGE_NUMBER', num)

        },

    },
};


export default countries;
