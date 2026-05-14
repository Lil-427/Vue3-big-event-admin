<script setup>
// 父传子传过来
defineProps({
  title: {
    required: true,
    type: String
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="heander">
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 具名插槽 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>

    <slot></slot>
  </el-card>
</template>

<style lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;
  .heander {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
