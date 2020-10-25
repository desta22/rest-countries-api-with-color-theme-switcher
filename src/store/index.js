// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state: {
//   },
//   mutations: {
//   },
//   actions: {
//   },
//   modules: {
//   }
// })

import Vue from 'vue'
import Vuex from 'vuex'
import countries from './modules/countries'
// import products from './modules/products'
// import cart from './modules/cart'
Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        countries
    }
})
