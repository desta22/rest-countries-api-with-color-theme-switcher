import axios from 'axios'


function chunkifyAllCountries(allCountries) {

    var result = allCountries.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / 8)
        if (!resultArray[chunkIndex]) {
            resultArray[chunkIndex] = [] // start a new chunk
        }
        resultArray[chunkIndex].push(item)
        return resultArray
    }, [])
    return result;
}

function extractRegions(allCountries) {
   return [...new Set(allCountries.map(country => country.region))]
}

const countries = {

    state: {

        countries: [],
        countriesChunk: [],
        regions: []
    },
    getters: {
        getChunk: (state) => (page_num) => {
            return state.countriesChunk[page_num];
        },
        getCountryById: (state) => (id) => {
            return state.countries.find(country => country.alpha3Code === id);
        },
        getRegions(state) {

            return state.regions
        }
    },
    mutations: {
        SET_ALL_COUNTRIES(state, data) {
            state.countries = data
        },
        SET_ALL_REGIONS(state, data) {
            state.regions = data
        },
        SET_COUNTRIES_CHUNK(state, data) {
            state.countriesChunk = data
        }
    },
    actions: {
        getCountries({commit}) {
            console.log('from getCountries');
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(res => {
                    const data = res.data
                    const allCountries = chunkifyAllCountries(data);
                    const allRegions = extractRegions(data);

                    commit('SET_ALL_COUNTRIES', data);
                    commit('SET_COUNTRIES_CHUNK', allCountries)
                    commit('SET_ALL_REGIONS', allRegions)
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
};


export default countries;
