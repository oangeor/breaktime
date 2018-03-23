import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '*',
    //   redirect: '/'
    // }
    {
      path:'/timer',
      name:'timer',
      component:require('@/components/timer/timer-work-dial.vue').default
    },
    {
      path:'/settings',
      name:'settings',
      component:require('@/components/timer/timer-settings.vue').default
    }
  ]
})
