import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
// pc端路由
export const pcRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    // hidden: true,
    children: [
      {
        path: 'dashboard',
        meta: { title: 'Dashboard', icon: 'ion-ios-speedometer' },
        component: () => import('@/views/dashboard/index')
      }
    ]
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
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: pcRouterMap
})

