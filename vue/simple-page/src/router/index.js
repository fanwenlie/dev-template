import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Index from '@/views/Index.vue'

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'Index',
      // hidden: true,
      component: Index
    },
    // {
    //   path: '/users',
    //   component: Layout,
    //   redirect: '/users/list',
    //   name: 'users',
    //   meta: { title: '用户信息', icon: 'ion-ios-person' },
    //   children: [
    //     {
    //       path: 'list',
    //       name: 'List',
    //       component: () => import('@/views/userList/index'),
    //       meta: { title: '用户列表', icon: 'ion-ios-paper' },
    //     }
    //   ]
    // }
  
  ]
})

