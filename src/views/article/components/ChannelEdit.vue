<script setup>
import { artAddChannelService, artEditChannelService } from '@/api/article'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const dialogVisible = ref(false)
const formRef = ref()

const formModel = ref({
  cate_name: '',
  cate_alias: ''
})

const rules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名必须是1-10位的非空字符',
      trigger: 'blur'
    }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: '分类别名必须是字母或数字',
      trigger: 'blur'
    }
  ]
}

// 定义 emit，用于通知父组件刷新列表
const emit = defineEmits(['success'])

const open = (row) => {
  console.log('open 接收到的 row:', row)
  dialogVisible.value = true

  // ✅ 方法1：解构赋值（你已经在用）
  if (row && row.id) {
    // 确保 id 被正确复制
    formModel.value = {
      id: row.id,
      cate_name: row.cate_name,
      cate_alias: row.cate_alias
    }
    console.log('编辑模式，formModel:', formModel.value)
  } else {
    formModel.value = { cate_name: '', cate_alias: '' }
    console.log('添加模式')
  }
}

// ✅ 添加 handleClose 方法
const handleClose = () => {
  dialogVisible.value = false
  formRef.value?.resetFields()
}

const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.id
  if (isEdit) {
    await artEditChannelService(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    await artAddChannelService(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}

// 向外暴露方法
defineExpose({
  open
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      style="padding: 30px"
    >
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="formModel.cate_name" placeholder="请输入分类名称" />
      </el-form-item>
      <!-- ✅ 修复：标签应该是"分类别名"，不是"分类名称" -->
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="formModel.cate_alias" placeholder="请输入分类别名" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
