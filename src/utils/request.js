import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const useStore = useUserStore() // ✅ 修正：useStrore → useStore
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 后端成功状态码是 0
    if (res.data.code === 0) {
      return res
    }
    // 示例：将停留时间设置为 1500 毫秒（1.5秒）
    ElMessage.error({
      message: res.data.message || '服务异常',
      duration: 1500
    })
    return Promise.reject(res.data)
  },
  (err) => {
    const msg = err.response?.data?.message || '服务异常'
    ElMessage.error(msg)

    // 处理401错误
    if (err.response?.status === 401) {
      router.push('/login')
    }

    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
