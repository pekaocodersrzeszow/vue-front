import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import BrandDashboard from './views/BrandDashboard.vue'
import Login from './views/Login.vue'
import Partner from './views/PartnerView.vue'
import Recommendations from './views/Recommend.vue'
import Heli from './views/HeliInFIre.vue'

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
      name: 'BrandDashboard',
      component: BrandDashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/partner/:id',
      name: 'PartnerView',
      component: Partner,
      props: true
    },
    {
      path: '/recommendations',
      name: 'Recommendations',
      component: Recommendations
    },
    {
      path: '/helicoperinfire',
      name: 'heli',
      component: Heli
    },


  ]
})
