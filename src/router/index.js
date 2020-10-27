import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Country from '../views/Country.vue'
import Region from '../views/Region.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/country/:alpha3Code',
        name: 'Country',
        component: Country
    },
    {
        path: '/region/:slug',
        name: 'Region',
        component: Region
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
function patchRouterMethod (router, methodName)
{
    router['old' + methodName] = router[methodName]
    router[methodName] = async function (location)
    {
        return router['old' + methodName](location).catch((error) =>
        {
            if (error.name === 'NavigationDuplicated')
            {
                return this.currentRoute
            }
            throw error
        })
    }
}

patchRouterMethod(router, 'push')
patchRouterMethod(router, 'replace')

export default router
