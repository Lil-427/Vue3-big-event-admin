<script setup>
import { useUserStore } from './stores/user'

const userStore = useUserStore()
</script>

<template>
  <div>
    <router-view></router-view>
    <hr />
    <hr />
    我是APP
    <el-button>跳首页</el-button>
    <el-button>跳列表页</el-button>

    {{ userStore.token }}
    <el-button @click="userStore.setToken('jksbds')">登录</el-button>
    <el-button @click="userStore.removeToken">退出</el-button>
  </div>
</template>

<sdtyle scoped></sdtyle>
