import { request } from './index';
//获取环境监测
export function getEnvMonitoring(params = {}) {
    return request(`/environmentalSupervision/environmentalMonitoring`, params, 'get');
}
//获取告警列表数据
export function getAlarmList(params = {}) {
    return request(`/environmentalSupervision/alarmList`, params, 'get');
}

// 获取水资源与排放
export function getWaterResources(params = {}) {
    return request(`/environmentalSupervision/waterResources`, params, 'get');
}

// 电力能耗分析
export function getPowerConsumptionAnalysis(params = {}) {
    return request(`/environmentalSupervision/powerConsumptionAnalysis`, params, 'get');
}
//根据项目id获取当前用户设备列表
export function getUserDeviceList(params = {}){
    return request(`/api/device/getUserDeviceList`, params, 'get');
}

//环境监测设备弹窗
export function getEnvironmentalDeviceById(params = {}){
    return request(`/environmentalSupervision/getEnvironmentalDeviceById`, params, 'get');
}

