import axios from 'axios'
import { showMessage } from './status' // 引入状态码文件
// import { ElMessage } from 'element-plus' // 引入el 提示框，这个项目里用什么组件库这里引什么

// 设置接口超时时间
axios.defaults.timeout = 60000
axios.defaults.baseURL = window.__ENV.API1_URL

// http request 拦截器
// axios.interceptors.request.use(
//   (config) => {
//     // 配置请求头
//     config.headers = {
//       // 'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
//       // 'Content-Type': 'application/json;charset=UTF-8', // 传参方式json
//       //   'token':'80c483d59ca86ad0393cf8a98416e2a1'              // 这里自定义配置，这里传的是token
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   }
// )
axios.interceptors.request.use(
  (config) => {
    // 自动处理 Token
    const token = localStorage.getItem('access_token') || ''
    if (token) {
      // 兼容多种后端：.NET 通常喜欢 'token'，标准 JWT 喜欢 'Authorization: Bearer <token>'
      config.headers['token'] = token 
      config.headers['Authorization'] = `Bearer ${token}` 
    }

    // 自动处理 FormData
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    } else if (config.data instanceof URLSearchParams) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } else if (config.data && typeof config.data === 'object' && !config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status) // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data)
    } else {
      // ElMessage.warning('网络连接异常,请稍后再试!')
    }
  }
)

// 封装 GET POST 请求并导出
export function request(url = '', params = {}, type = 'POST', options = {}) {
  const { isForm = false, ...axiosConfig } = options
  
  let data = params
  const headers = { ...axiosConfig.headers }

  // 处理表单格式 (x-www-form-urlencoded)
  if (isForm && type.toUpperCase() === 'POST') {
    // 尝试使用 URLSearchParams，这是 axios 1.x 推荐的处理 x-www-form-urlencoded 的方式
    const formParams = new URLSearchParams()
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        formParams.append(key, params[key])
      }
    }
    data = formParams
  }

  return new Promise((resolve, reject) => {
    const requestConfig = {
      ...axiosConfig,
      url,
      method: type.toUpperCase(),
      params: type.toUpperCase() === 'GET' ? params : undefined,
      data: type.toUpperCase() === 'POST' ? data : undefined,
      headers,
    }

    axios(requestConfig)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  })
}
// 封装 GET POST 请求并导出
// export function request(url = '', params = {}, type = 'POST') {
//   return new Promise((resolve, reject) => {
//     let promise
//     if (type.toUpperCase() === 'GET') {
//       promise = axios({
//         url,
//         params,
//       })
//     } else if (type.toUpperCase() === 'POST') {
//       promise = axios({
//         method: 'POST',
//         url,
//         data: params,
//       })
//     }
//     // 处理返回
//     promise
//       .then((res) => {
//         resolve(res)
//       })
//       .catch((err) => {
//         reject(err)
//       })
//   })
// }