<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import KtEchart from '@/components/utils-ui/kt-echart.vue'
import { panel, pie, createOption1 } from './createOption'
import { getMonitoringAndAlarming, getDeviceSafetyInspection, getPotentialRiskRectification } from '@/axios/safety-control-factory'
import TimerManager from '@/utils/timerManager'

const select = ref(0)
const dateType = ref('day')
const rawData = ref({
  天: [
    { date: '0', value: '75' },
    { date: '4', value: '125' },
    { date: '8', value: '75' },
    { date: '12', value: '60' },
    { date: '16', value: '175' },
    { date: '20', value: '265' },
  ],
  周: [
    { date: '0', value: '100' },
    { date: '4', value: '150' },
    { date: '8', value: '120' },
    { date: '12', value: '80' },
    { date: '16', value: '200' },
    { date: '20', value: '300' },
  ],
  月: [
    { date: '0', value: '110' },
    { date: '4', value: '160' },
    { date: '8', value: '170' },
    { date: '12', value: '180' },
    { date: '16', value: '10' },
    { date: '20', value: '150' },
  ],
})

const tabs = ref([
  {
    name: '天',
    active: true,
    bg: 'bg-[url(@/assets/img/7-1.png)]',
    bg2: 'bg-[url(@/assets/img/7-2.png)]',
  },
  {
    name: '周',
    active: false,
    bg: 'bg-[url(@/assets/img/7-1.png)]',
    bg2: 'bg-[url(@/assets/img/7-2.png)]',
  },
  {
    name: '月',
    active: false,
    bg: 'bg-[url(@/assets/img/7-1.png)]',
    bg2: 'bg-[url(@/assets/img/7-2.png)]',
  },
])
const data = ref({
  section1: {
    1: {
      name: '设备总数',
      total: 689,
      unit: '个',
    },
    2: {
      设备开机: {
        name: '设备开机',
        total: 689,
        unit: '个',
        textColor: '#62EFD3',
      },
      设备停机: {
        name: '设备停机',
        total: 0,
        unit: '个',
        textColor: '#FFB348',
      },
      设备故障: {
        name: '设备故障',
        total: 0,
        unit: '个',
        textColor: '#FF6969',
      },
    },
  },
  section2: {
    隐患总数: {
      name: '隐患总数',
      total: 0,
      textColor: '#FFB348',
      img: 'bg-[url(@/assets/img/5-1.png)]',
    },
    已验收数: {
      name: '已验收数',
      total: 2121,
      textColor: '#62EFD3',
      img: 'bg-[url(@/assets/img/5-2.png)]',
    },
  },
  section3: {
    1: {
      name: '设备类型',
      data: [
        { name: '坠落', value: '12' },
        { name: '冒顶', value: '12' },
        { name: '触电', value: '12' },
        { name: '机械伤害', value: '12' },
        { name: '中毒窒息', value: '12' },
      ],
    },
    // options: {
    //   option1: createOption1({
    //     rawData: rawData[tabs.value[select.value].name], // 使用模拟数据
    //     // color: ,
    //     label: tabs.value[select.value].name,
    //   }),
    // },
    2: {},
  },
})

// 计算属性：获取当前选中的选项卡名称
const currentTabName = computed(() => {
  return tabs.value[select.value]?.name || '天'
})

// 计算属性：获取当前选项卡对应的数据
const currentChartData = computed(() => {
  return rawData.value[currentTabName.value] || []
})

// 计算属性：动态生成图表配置
const chartOption = computed(() => {
  return createOption1({
    rawData: currentChartData.value,
    label: currentTabName.value,
  })
})
const getDateType = () => {
  if (currentTabName.value === '天') return 'day'
  if (currentTabName.value === '周') return 'week'
  return 'month'
}
const handleSelect = (index) => {
  tabs.value.forEach((tab, i) => {
    tab.active = i === index
  })
  select.value = index
  // 不需要手动更新option，因为chartOption是计算属性，会自动更新
}

let echartsData1 = ref({})
let echartsData2 = ref({})
const chartRef = ref(null)

// 监控与告警

const MonitoringAndAlarming = async () => {
  const dateType = getDateType() // 获取当前选中的类型
  // console.log('请求数据类型:', dateType)

  const res = await getMonitoringAndAlarming({ dateType })

  if (res.data.code === 200) {
    const result = res.data.data

    // 1. 处理告警统计
    data.value.section3[1].data = []
    if (result.alarmStatistics && result.alarmStatistics.length <= 6) {
      data.value.section3[1].data = result.alarmStatistics.map((item) => ({
        name: item.securityIncidentType,
        value: item.alarmNum,
      }))
      // 更新饼图
      echartsData2.value = pie(data.value.section3[1].data)
    }

    // 2. 只更新当前选中的数据类型
    if (result.statistics && result.statistics.length > 0) {
      // 清空当前类型的数据
      rawData.value[currentTabName.value] = []

      // 根据当前类型筛选数据
      result.statistics.forEach((item) => {
        if (dateType === 'day' && item.hour !== null) {
          rawData.value['天'].push({
            date: String(item.hour),
            value: item.num,
          })
        } else if (dateType === 'week' && item.weekDay !== null) {
          rawData.value['周'].push({
            date: String(item.weekDay),
            value: item.num,
          })
        } else if (dateType === 'month' && item.monthDay !== null) {
          rawData.value['月'].push({
            date: String(item.monthDay),
            value: item.num,
          })
        }
      })

      // console.log(`更新 ${currentTabName.value} 数据:`, rawData.value[currentTabName.value])
    }
  }
}
// 设备安全检测

const DeviceSafetyInspection = async () => {
  const res = await getDeviceSafetyInspection({})
  if (res.data.code === 200) {
    const result = res.data.data
    result.forEach((item) => {
      const { totalNum, activateNum, shutdownNum, faultNum } = item
      data.value.section1['1'].total = totalNum
      data.value.section1['2']['设备开机'].total = activateNum
      data.value.section1['2']['设备停机'].total = shutdownNum
      data.value.section1['2']['设备故障'].total = faultNum
    })
  }
}
// 隐患整治
const PotentialRiskRectification = async () => {
  const res = await getPotentialRiskRectification({})
  if (res.data.code === 200) {
    const result = res.data.data
    result.forEach((item) => {
      // const { potentialNum, inspectionNum } = item
      data.value.section2['隐患总数'].total = item.potentialNum
      data.value.section2['已验收数'].total = item.inspectionNum
    })
    echartsData1.value = panel(data.value.section2['隐患总数'].total, data.value.section2['已验收数'].total)
  }
}

// const Leakage = async () => {
//   const res = await getLeakage({})
//   if (res.status === 200) {
//     console.log(res.data)
//   }
// }
// Leakage()
// onMounted(() => {
//   nextTick(() => {
//     const chartInstance = chartRef.value?.chart // ✅ 获取 ECharts 实例

//     // 监听图例切换事件
//     chartInstance.on('legendselectchanged', (params) => {
//       const clickedName = params.name // "天"、"周"、"月"
//       console.log('Clicked legend name:', clickedName)
//       // 更新按钮背景状态
//       Object.keys(data.value.section3['2']).forEach((key) => {
//         data.value.section3['2'][key].active = key === clickedName
//       })

//       if (select.value === 0) {
//         rawData.value = dayRawData.value
//         console.log(dayRawData.value)
//       } else if (select.value === 1) {
//         rawData.value = weekRawData.value
//         console.log(weekRawData.value)
//       } else if (select.value === 2) {
//         rawData.value = monthRawData.value
//         console.log(monthRawData.value)
//       }

//       // data.value.section3.options.option1 = createOption1(rawData.value)
//     })
//   })
// })

onMounted(() => {
  MonitoringAndAlarming()
  PotentialRiskRectification()
  DeviceSafetyInspection()
  echartsData1.value = panel(2.5, 5)
  echartsData2.value = pie(data.value.section3['1'].data)
  
  TimerManager.addTimer('monitoringAndAlarming', MonitoringAndAlarming)
  TimerManager.addTimer('deviceSafetyInspection', DeviceSafetyInspection)
  TimerManager.addTimer('potentialRiskRectification', PotentialRiskRectification)
})

onUnmounted(() => {
  TimerManager.clearTimer('monitoringAndAlarming')
  TimerManager.clearTimer('deviceSafetyInspection')
  TimerManager.clearTimer('potentialRiskRectification')
})

// MonitoringAndAlarming()
watch(select, () => {
  MonitoringAndAlarming()
})
</script>
<template>
  <div class="w-[700px] top-[117px] left-[44px] absolute flex flex-col">
    <!-- 设备安全检测  -->
    <cus-title title="设备安全监测" position="left" :download="true" @import-success="DeviceSafetyInspection" />
    <div class="bg-[url('@/assets/img/1.png')] h-[289px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/22-1.png')] mt-[20px] flex items-center">
        <div class="ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section1['1'].name }}</div>
        <div class="text-[48px] text-[#83DAFF] ml-[292px]">{{ data.section1['1'].total }}</div>
        <div class="text-[20px] ml-[7px] mt-[22px]">{{ data.section1['1'].unit }}</div>
      </div>
      <div class="bg-[url('@/assets/img/2.png')] kt-bg-full w-[651px] h-[130px] flex justify-around pl-[168px]">
        <div v-for="(item, index) in data.section1['2']" :key="index">
          <div class="flex flex-wrap mt-[23px] w-[100px]">
            <div class="text-[36px]">{{ item.total }}</div>
            <div class="ml-[6px] mt-[16px] text-[20px]">{{ item.unit }}</div>
            <div class="text-[24px] font-[NotoSansSC]" :style="{ color: item.textColor }">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 隐患治理 -->
    <cus-title title="隐患治理" position="left" :download="true" @import-success="PotentialRiskRectification"/>
    <div class="bg-[url('@/assets/img/1.png')] h-[282px] w-[700px] kt-bg-full flex items-center justify-around">
      <div class="flex-2 flex flex-col items-center">
        <div class="w-[204px] h-[164px] bg-[url('@/assets/img/3.png')] kt-bg-full relative pl-[8px] ">
          <div class="w-[200px] h-[200px] pt-[12px] pr-[10px]">
            <kt-echart v-if="echartsData1" :option="echartsData1" />
          </div>
        </div>
        <div class="w-[157px] h-[38px] bg-[url('@/assets/img/4.png')] kt-bg-full flex items-center justify-center mt-[33px]">
          <div class="text-[24px] font-[NotoSansSC] kt-bg-gradient3">隐患整改率</div>
        </div>
      </div>
      <div class="flex-3">
        <div v-for="(item, index) in data.section2" :key="index">
          <div :class="['w-[386px] h-[94px] kt-bg-full flex items-center justify-around pl-[128px] mt-[24px]', item.img]">
            <span :style="{ color: item.textColor }" class="text-[24px] font-[NotoSansSC]">
              {{ item.name }}
            </span>
            <span class="text-[36px]">{{ item.total }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 监控与告警 -->
    <cus-title title="监控与告警" position="left" :download="true" @import-success="MonitoringAndAlarming"/>
    <div class="bg-[url('@/assets/img/1.png')] w-[700px] kt-bg-full flex flex-col gap-[20px] h-[492px]">
      <!-- 第一部分 -->
      <div class="relative w-full h-[151px] mt-[24px]">
        <div class="absolute top-[47px] left-[110px] w-[38px] h-[38px] bg-[url('@/assets/img/11.png')] kt-bg-full"></div>

        <div class="grid grid-cols-2 grid-rows-3 grid-flow-col gap-y-[3px] gap-x-[33px] ml-[231px] h-full">
          <div v-for="(item, index) in data.section3['1'].data" :key="index">
            <div class="w-[200px] h-[43px] bg-[url('@/assets/img/6.png')] kt-bg-full"></div>
          </div>
        </div>

        <div class="absolute inset-0 pointer-events-auto">
          <kt-echart :option="echartsData2" />
        </div>
      </div>

      <!-- 第二部分 -->
      <div class="w-full flex flex-col gap-[12px]">
        <!-- 标题 -->
        <div class="flex w-full ml-[20px]">
          <div class="w-[38px] h-[38px] bg-[url('@/assets/img/10.png')] kt-bg-full"></div>
          <span class="text-[24px] font-[NotoSansSC]">近期告警趋势分析</span>
        </div>

        <!-- tabs -->
        <div class="flex flex-nowrap gap-[5px] ml-[520px] pointer-events-auto z-10">
          <div v-for="(item, index) in tabs" :key="index">
            <div
              class="w-[48px] h-[28px] kt-bg-full pointer-events-auto flex justify-center items-center cursor-pointer hover:opacity-90"
              :class="[item.active ? item.bg : item.bg2]"
              @click="handleSelect(index)"
            >
              <span class="text-[20px]">{{ item.name }}</span>
            </div>
          </div>
        </div>

        <!-- 折线图 -->
        <div class="w-[700px] h-[290px] mt-[-70px] pointer-events-auto">
          <kt-echart :option="chartOption" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
