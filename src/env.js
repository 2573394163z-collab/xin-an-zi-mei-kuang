const CUS_ENV = {}

// 自定义环境变量
if (import.meta.env.DEV) {
  // 开发环境接口地址
  CUS_ENV.API1_URL = 'http://10.1.10.20:8099' //http://10.1.10.43:8099  http://rea6e797.natappfree.cc 10.1.10.20
}
else {
  // 生产环境接口地址
  CUS_ENV.API1_URL = 'http://192.168.3.99:8099'
}

// 导出所有环境变量
export const env = {
  ...import.meta.env,
  ...CUS_ENV,
}

// 挂载到window对象使其全局可用
if (typeof window !== 'undefined') {
  window.__ENV = env
}
