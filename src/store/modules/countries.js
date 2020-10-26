import axios from 'axios'

function chunkArray(arr, chunk_size) {
    var myArray = [...arr]
    var results = [];

    while (myArray.length) {
        results.push(myArray.splice(0, chunk_size));
    }

    return results;
}

// function chunkifyAllCountries(allCountries) {
//     let result;
//     if (allCountries.length > 8) {
//         // console.log("allCountries: ", allCountries);
//          result = allCountries.reduce((resultArray, item, index) => {
//             const chunkIndex = Math.floor(index / 8)
//             if (!resultArray[chunkIndex]) {
//                 resultArray[chunkIndex] = [] // start a new chunk
//             }
//             resultArray[chunkIndex].push(item)
//             return resultArray
//         }, [])
//     } else {
//         // console.log("allCountries: ", allCountries);
//     result = [allCountries]
//     }
//     return result;
// }


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
        regions: [],
        selectedRegion: null,
        // statesNames:[],
    },
    getters: {

        getChunk: (state) => (page_num) => {
            return state.countriesChunk[page_num];
        },
        getCountryById: (state) => (id) => {
            return state.countriesAll.find(country => country.alpha3Code === id);
        },
        getRegions(state) {
            return state.regions
        },
        getAllCountries(state) {
            return state.countriesAll;
        },
        // getStatesNames(state) {
        //     return state.statesNames
        // }
    },
    mutations: {
        SET_ALL_COUNTRIES(state, data) {
            state.countriesAll = data
        },
        SET_ALL_REGIONS(state, data) {
            state.regions = data
        },
        SET_COUNTRIES_CHUNK(state, data) {
            state.countriesChunk = data
        }
    },
    actions: {
        getCountriesByRegion({commit}, region) {
            axios
                .get('https://restcountries.eu/rest/v2/region/' + region)
                .then(res => {
                    const data = res.data;
                    const allCountries = chunkArray(data, 8);
                    commit('SET_COUNTRIES_CHUNK', allCountries);

                })
                .catch(err => {
                    console.log(err);
                })
        },
        getCountries({commit}) {
            axios
                .get('https://restcountries.eu/rest/v2/all')
                .then(res => {
                    const data = res.data;
                    commit('SET_ALL_COUNTRIES', data);
                    commit('SET_ALL_REGIONS', extractRegions(data));

                    commit('SET_COUNTRIES_CHUNK', chunkArray(data, 8));
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
};


export default countries;
