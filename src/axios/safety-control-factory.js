import { request } from './index'
import axios from 'axios'
// //test
// export function geteakage(params = {}) {
//     return request(`/leakage`, params, 'get');
// }
//获取监控与告警
export function getMonitoringAndAlarming(params = {}) {
  return request(`/safety/monitoringAndAlarming`, params, 'get')
}
//获取设备安全监测
export function getDeviceSafetyInspection(params = {}) {
  return request(`/safety/deviceSafetyInspection`, params, 'get')
}
//隐患治理
export function getPotentialRiskRectification(params = {}) {
  return request(`/safety/potentialRiskRectification`, params, 'get')
}
export function geteakage(params = {}) {
  return request(`/leakage`, params, 'get')
}

// 获取位置实时人员-人员在岗-各中段人数
export function getRealMessage(params = {}) {
  const apiUrl = window.kt_config?.api_url || 'http://192.168.3.201:8001'
  return request(`${apiUrl}/RYDW/RealMessage/GetGisRealWzInfos`, params, 'post', {
    isForm: true,
    needToken: true,
  })
}

// 获取出勤汇总
export function getAttendanceDetail(params = {}) {
  const apiUrl = window.kt_config?.api_url || 'http://192.168.3.201:8001'
  return request(`${apiUrl}/RYDW/Attendancedetail/GetAttendanceNewSummaryList`, params, 'post', {
    isForm: true,
    needToken: true,
  })
}


// 获取所有人员报警信息
export function getAlarmInfo(params = {}) {
  const apiUrl = window.kt_config?.api_url || 'http://192.168.3.201:8001'
  return request(`${apiUrl}/RYDW/Alarminfo/GetPersonPageList`, params, 'post', {
    isForm: true,
    needToken: true,
  })
}
