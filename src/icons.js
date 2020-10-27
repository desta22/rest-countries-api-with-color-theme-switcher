import Vue from 'vue';
import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {faArrowLeft , faArrowRight, faSearch, faChevronDown,faChevronUp, faAngleDoubleLeft, faAngleDoubleRight, faEllipsisH} from '@fortawesome/free-solid-svg-icons'
import {faMoon} from '@fortawesome/free-regular-svg-icons'

library.add(faArrowLeft , faArrowRight, faSearch, faChevronDown,faChevronUp, faAngleDoubleLeft, faAngleDoubleRight, faEllipsisH, faMoon)
Vue.component('fa-icon', FontAwesomeIcon)
