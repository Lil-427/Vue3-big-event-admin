import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

import LayoutContainer from '@/views/layout/LayoutContainer.vue'
import ArticleManage from '@/views/article/ArticleManage.vue'
import ArticleChannel from '@/views/article/ArticleChannel.vue'
import UserAvatar from '@/views/user/UserAvatar.vue'
import UserPassword from '@/views/user/UserPassword.vue'
import Userprofile from '@/views/user/UserProfile.vue'
import Login from '@/views/login/LoginPage.vue'

// creatRouter 创建路由实例
// 配置 history 模式
// 1、history 模式： creatWebHistory    地址栏不带 #
// 2、hash 模式：    creatWebHashHistory 地址栏带 #
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: LayoutContainer,
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', component: ArticleManage },
        { path: '/article/channel', component: ArticleChannel },
        { path: '/user/avatar', component: UserAvatar },
        { path: '/user/password', component: UserPassword },
        { path: '/user/rprofile', component: Userprofile }
      ]
    }
  ]
})

// 登录访问拦截
router.beforeEach((to) => {
  // 如果没有token，且访问的是非登录页面，拦截到登录，其他情况正常放行
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})
export default router
