import Vue from 'vue'
import Router from 'vue-router'
import Collapse from './collapse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'collapse',
      component: Collapse
    }
  ]
})
