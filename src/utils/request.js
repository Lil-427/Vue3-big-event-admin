import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMassage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStrore = useUserStore()
    if (useStrore.token) {
      config.headers.Authorization = useStrore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据
    if (res.data.code === 0) {
      return res
    }
    // TODO 3. 处理业务失败
    // 业务失败，给错误提示
    ElMassage.error(res.data.massage || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    ElMassage.error(err.response.data.massage || '服务异常')
    // TODO 5. 处理401错误
    // 错误的特殊情况 => 401权限不足 或 token过期 =>拦截登录
    if (err.response.status === 401) {
      router.push('/login')
    }

    // 错误默认情况 =>只给提示
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
