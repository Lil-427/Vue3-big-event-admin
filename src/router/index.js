import { createRouter, createWebHistory } from 'vue-router'
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

export default router
