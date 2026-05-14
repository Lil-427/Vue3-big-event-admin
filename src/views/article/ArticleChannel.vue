<script setup>
import { artDelChannelService, artGetChannelService } from '@/api/article'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import ChannelEdit from './components/ChannelEdit.vue'

const channelList = ref([])
const loading = ref(false)
const dialog = ref()

const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelService()
  channelList.value = res.data.data
  loading.value = false
}

getChannelList()

const onEditChannel = (row) => {
  dialog.value.open(row) // ✅ 只需要传 row，不需要 $index
}

const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()
}
const onAddChannel = () => {
  dialog.value.open({}) // ✅ 传空对象
}

const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table :data="channelList" v-loading="loading" style="width: 100%">
      <!-- ✅ 序号列添加 type="index" -->
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column prop="cate_name" label="分类名称" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="150">
        <template #default="{ row, $index }">
          <el-button
            @click="onEditChannel(row)"
            :icon="Edit"
            type="primary"
            circle
            plain
          />
          <el-button
            @click="onDelChannel(row, $index)"
            :icon="Delete"
            type="danger"
            circle
            plain
          />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>

    <!-- ✅ 添加 @success 监听 -->
    <ChannelEdit ref="dialog" @success="onSuccess" />
  </page-container>
</template>
