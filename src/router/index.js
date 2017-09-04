import Vue from 'vue'
import Router from 'vue-router'
import Collapse from './Collapse.vue'
import Index from './Index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Index
    },
    {
      path: '/collapse',
      name: '折叠组件',
      component: Collapse
    }
  ]
})
