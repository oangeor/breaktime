import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + 'production')

Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '*',
//       redirect: '/timer'
//     },
//     {
//       path:'/timer',
//       name:'timer',
//       // component:require('@/components/timer/timer-settings.vue').default
//       component:require('@/components/timer/index.vue').default
//       // component:require('@/components/timer/timer-work-dial.vue').default
//     },
//     {
//       path:'/settings',
//       name:'settings',
//       component:require('@/components/timer/timer-settings.vue').default
//     }
//   ]
// })



export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/settings'
    },
    {
      path: '/work',
      name: 'work',
      // component:require('@/components/timer/timer-settings.vue').default
      component: require('@/views/work/index.vue').default
      // component:require('@/components/timer/timer-work-dial.vue').default
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/views/settings/index.vue').default
      // component:require('@/components/timer/timer-settings.vue').default
      
    },
    {
      path: '/break',
      name: 'break',
      component: require('@/views/break/index.vue').default
    }
  ]
})
