<script setup>
// import { useUserStore } from './stores/user'
import zh from 'element-plus/es/locale/lang/zh-cn.mjs'
// const userStore = useUserStore()
</script>

<template>
  <div>
    <!-- 国际化处理 -->
    <el-config-provider :locale="zh">
      <router-view />
    </el-config-provider>
  </div>
</template>

<sdtyle scoped></sdtyle>
