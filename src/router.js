import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BrandDashboard from './views/BrandDashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/brand',
      name: 'brand',
      component: BrandDashboard
    }

  ]
})
