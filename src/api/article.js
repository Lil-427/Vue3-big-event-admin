import request from '@/utils/request'

// 获取文章分类
export const artGetChannelService = () =>
  request.get('https://big-event-vue-api-t.itheima.net/my/cate/list')

// 添加文章分类
export const artAddChannelService = (data) => request.post('/my/cate/add', data)

// 编辑文章分类info
export const artEditChannelService = (data) =>
  request.post('/my/cate/info', data)

// 删除文章分类
export const artDelChannelService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 文章：获取文章列表
export const artGetListService = (params) =>
  request.get('/my/article/list', { params })

// 文章：添加文章
export const artPublishService = (data) => request.post('/my/article/add', data)

// 文章：编辑
export const artGetDetailService = (id) =>
  request.get('my/article/info', { params: { id } })

export const artEditService = (data) => request.put('my/article/info', data)
