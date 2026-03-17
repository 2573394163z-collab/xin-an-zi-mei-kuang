import { request } from './index';
//获取生产执行计划
export function getProductionExecutionPlan(params = {}) {
    return request(`/productionManage/productionExecutionPlan`, params, 'get');
}
//获取班组状态
export function getGroupStatus(params = {}) {
    return request(`/productionManage/groupStatus`, params, 'get');
}
//获取班组状态
export function getProductionProgress(params = {}) {
    return request(`/productionManage/productionProgress`, params, 'get');
}

// 获取默认班次
export function getDefaultEntity(params = {}) {
    const apiUrl = window.kt_config?.api_url || 'http://192.168.3.201:8001'
    return request(`${apiUrl}/RYDW/Class/GetDefaultEntity`, params, 'post', {
      isForm: true,
      needToken: true,
    })
}