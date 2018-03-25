import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/timer'
    },
    {
      path:'/timer',
      name:'timer',
      // component:require('@/components/timer/timer-settings.vue').default
      component:require('@/components/timer/index.vue').default
      // component:require('@/components/timer/timer-work-dial.vue').default
    },
    {
      path:'/settings',
      name:'settings',
      component:require('@/components/timer/timer-settings.vue').default
    }
  ]
})
