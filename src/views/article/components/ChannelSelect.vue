<script setup>
import { artGetChannelService } from '@/api/article'
import { ref } from 'vue'

const channelList = ref([])
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const getChannleList = async () => {
  const res = await artGetChannelService()
  channelList.value = res.data.data
}

getChannleList()
</script>

<template>
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    style="width: 200px"
    placeholder="请选择"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    ></el-option>
  </el-select>
</template>
