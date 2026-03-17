import { request } from './index'
import axios from 'axios'

//获取token
export function getToken(params = {}) {
    // 使用配置文件中的 api_url 拼接完整 URL
    const apiUrl = window.kt_config?.api_url || 'http://192.168.3.201:8001'; // 默认值，以防配置未加载
    
    // 使用封装后的 request 函数
    return request(`${apiUrl}/User/Login`, params, 'post', { isForm: true }).then((res) => {
      // 根据接口返回值结构提取 Token
      if (res.data.code === 200) {
        return res.data.data
      } else {
        throw new Error(res.data.info || '获取 Token 失败')
      }
    })
  }
  

