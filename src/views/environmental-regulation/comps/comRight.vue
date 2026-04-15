<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'
import { createOption2 } from './createOption'
import cusTable2 from '@/components/my-ui/cus-table2.vue'
import ktAnimeScroll from '@/components/kt-ui/kt-anime-scroll.vue'
import { getAlarmList, getPowerConsumptionAnalysis, getWaterResources } from '@/axios/environmental-regulation'
import TimerManager from '@/utils/timerManager'

const data = ref({
  section1: {
    // 1: {
    //   value: '92%',
    // },
    1: {
      name: '明渠累计流量小数点',
      value: '18899',
      unit: 'm³',
    },
  },
  section2: {
    1: {
      name: '本月总耗电量',
      total: 344,
      unit: 'kWh',
    },
    2: {
      options: {
        option1: createOption2(),
      },
    },
  },
  section3: [
    // {
    //   content: 'XXXX设备',
    //   alarmValue: '15.0',
    //   limitValue: '20.0',
    //   envFactor: 'PM10',
    //   time: '2025年9月24日 14:45:34',
    //   status: '超下限',
    // },
    // {
    //   content: 'XXXX设备',
    //   alarmValue: '25.0',
    //   limitValue: '20.0',
    //   envFactor: 'PM10',
    //   time: '2025年9月24日 14:45:34',
    //   status: '超上限',
    // },
    // {
    //   content: 'XXXX设备',
    //   alarmValue: '15.0',
    //   limitValue: '20.0',
    //   envFactor: 'PM10',
    //   time: '2025年9月24日 14:45:34',
    //   status: '离线报警',
    // },
    // {
    //   content: 'XXXX设备',
    //   alarmValue: '15.0',
    //   limitValue: '20.0',
    //   envFactor: 'PM10',
    //   time: '2025年9月24日 14:45:34',
    //   status: '超下限',
    // },
    // {
    //   content: 'aaa设备',
    //   alarmValue: '15.0',
    //   limitValue: '20.0',
    //   envFactor: '重庆',
    //   time: '2025年10月24日 14:45:34',
    //   status: '超下限',
    // },
  ],
  // section3: {
  //   1: {
  //     content: '15103采面上隅角-温度超标，当前监测为为...',
  //     local: 'XXXXXXXXXXX',
  //     time: '2025年9月24日 14:45:34',
  //     status: '已完成',
  //   },
  //   2: {
  //     content: '15103采面上隅角-温度超标，当前监测为为...',
  //     local: 'XXXXXXXXXXX',
  //     time: '2025年9月24日 14:45:34',
  //     status: '待处理',
  //   },
  //   3: {
  //     content: '15103采面上隅角-温度超标，当前监测为为...',
  //     local: 'XXXXXXXXXXX',
  //     time: '2025年9月24日 14:45:34',
  //     status: '已完成',
  //   },
  //   4: {
  //     content: '15103采面上隅角-温度超标，当前监测为为...',
  //     local: 'XXXXXXXXXXX',
  //     time: '2025年9月24日 14:45:34',
  //     status: '已完成',
  //   },
  //   5: {
  //     content: '15102采面上隅角-温度超标，当前监测为为...',
  //     local: '重庆',
  //     time: '2025年10月24日 14:45:34',
  //     status: '已完成',
  //   },
  // },
})

const searchKey = ref('')
const scrollRef = ref(null)

// const filteredList = computed(() => {
//   const key = searchKey.value.trim()
//   if (!key) return Object.values(data.value.section3)

//   return Object.values(data.value.section3).filter((item) => {
//     return item.content.includes(key) || item.local.includes(key) || item.time.includes(key)
//   })
// })

const filteredList = computed(() => {
  const key = searchKey.value.trim()
  if (!key) return Object.values(data.value.section3)

  return Object.values(data.value.section3).filter((item) => {
    return item.content.includes(key) || item.envFactor.includes(key) || item.time.includes(key)
  })
})
const search = () => {
  nextTick(() => {
    scrollRef.value?.reset()
  })
  console.log(filteredList.value)
}

const alarmList = async () => {
  const res = await getAlarmList()
  console.log('11111111111111111111', res)
  if (res.code === 200) {
    const result = res.data.data
    data.value.section3 = result.map((item) => {
      const { deviceName, factor, alarmType, alarmValue, limitValue, strtime } = item
      return {
        content: deviceName,
        alarmValue: alarmValue,
        limitValue: limitValue,
        envFactor: factor,
        time: strtime,
        status: alarmType === 1 ? '离线报警' : alarmType === 2 ? '超上限' : '超下限',
      }
    })
  }
}



// ================== 获取水资源与排放数据 ==================
// 格式化数字为"万"单位的函数
const formatNumberToWan = (num, decimals = 2) => {
  if (num === null || num === undefined || isNaN(num)) {
    return num
  }
  
  const wan = 10000
  if (Math.abs(num) < wan) {
    return num
  }
  
  // 使用指定的保留小数位数
  const formatted = (num / wan).toFixed(decimals)
  return `${formatted}万`
}
const waterResourcesList = async () => {
  const res = await getWaterResources()
  if (res.data.code === 200) {
    const result = res.data.data
    const formattedValue = formatNumberToWan(result)
    
    data.value.section1['1'].value = formattedValue||0
  }
}


// 数据转换函数
const transformData = (rawData) => {
  console.log('rawData: ', rawData)
  return rawData.map((item) => ({
    date: item.record_date.split('-').slice(1).join('/'), // 将日期格式转换为 MM/DD
    value: item.day_increment, // 转换为浮点数并保留两位小数
  }))
  console.log('transformData result: ', result)
}
const powerConsumptionAnalysis = async () => {
  const res = await getPowerConsumptionAnalysis()
  console.log('powerConsumptionAnalysis res: ', res)
  if (res.data.code === 200) {
    const result = res.data.data

    console.log('powerConsumptionAnalysis result: ', result)
    const totalPower = result['本月总耗电量数据统计']
    console.log('totalPower: ', totalPower)
    const powerValue =totalPower
    console.log('powerValue: ', powerValue)
    // 转换并格式化
    data.value.section2['1'].total = powerValue !== '--' ? parseFloat(powerValue).toFixed(2) : '--' 

    data.value.section2[2].options.option1 = createOption2(transformData(result['电力近七天消耗曲线']))
    console.log('data.value.section2[2].options.option1: ', data.value.section2[2].options.option1)
  }
}
// alarmList()
// powerConsumptionAnalysis()
// 组件挂载时设置定时器
onMounted(() => {
  alarmList()
  powerConsumptionAnalysis()
  waterResourcesList()

  TimerManager.addTimer('alarmList', alarmList)
  TimerManager.addTimer('powerConsumptionAnalysis', powerConsumptionAnalysis)
  TimerManager.addTimer('waterResourcesList', waterResourcesList)
})

onUnmounted(() => {
  TimerManager.clearTimer('alarmList')
  TimerManager.clearTimer('powerConsumptionAnalysis')
  TimerManager.clearTimer('waterResourcesList')
})
</script>
<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col">
    <!-- 水资源与排放  -->
    <cus-title title="水资源与排放" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[180px] w-[700px] kt-bg-full flex items-center justify-around">
      <div class="w-[105px] h-[104px] bg-[url('@/assets/img/31-1.png')] kt-bg-full flex items-center justify-center">
        <!-- <span class="text-[32px]">{{ data.section1['1'].value }}</span> -->
      </div>
      <div class="w-[556px] h-[103px] bg-[url('@/assets/img/31-2.png')] kt-bg-full flex items-center justify-around">
        <div class="text-[28px] flex-3 ml-[5px] ">{{ data.section1['1'].name }}</div>
        <div class="text-[40px] text-[#83DAFF] flex-2 flex justify-end">{{ data.section1['1'].value }}</div>
        <div class="text-[20px] flex-1 flex justify-center">{{ data.section1['1'].unit }}</div>
      </div>
    </div>
    <!-- 电力能耗分析 -->
    <cus-title title="电力能耗分析" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[311px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/23.png')] mt-[20px] flex items-center justify-between">
        <div class="w-[180px] ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section2['1'].name }}</div>
        <div class="flex mr-[20px] items-center">
          <div class="text-[48px] text-[#83DAFF]">{{ data.section2['1'].total }}</div>
          <div class="text-[20px] ml-[7px]">{{ data.section2['1'].unit }}</div>
        </div>
      </div>
      <div class="w-[700px] h-[139px] pointer-events-auto">
        <kt-echart :option="data.section2[2].options.option1" />
      </div>
    </div>
    <!-- 告警列表 -->
    <cus-title title="告警列表" position="right" />

    <div class="bg-[url('@/assets/img/1.png')] h-[572px] w-[700px] kt-bg-full flex flex-wrap justify-center overflow-hidden">
      <div class="relative w-[660px] mt-[15px] pointer-events-auto">
        <input class="search text-[24px] pl-[16px]" placeholder="请输入关键字" v-model="searchKey" />
        <div class="w-[32px] h-[32px] bg-[url('@/assets/img/33.png')] absolute top-[11px] right-[22px]" @click="search()"></div>
      </div>
      <!-- 自动滚动区域 -->
      <div class="w-full h-[453px] ml-[20px] mt-[22px] mb-[28px]" v-if="filteredList.length">
        <ktAnimeScroll ref="scrollRef">
          <!-- <div v-for="(item, index) in filteredList" :key="index">
            <div
              class="w-[649px] h-[141px] mt-[20px] flex flex-wrap"
              :class="[item.status === '已完成' ? 'bg-[url(@/assets/img/32-1.png)]' : 'bg-[url(@/assets/img/32-2.png)]']"
            >
              <div class="ml-[64px] text-[24px] h-[50px] flex items-center">
                {{ item.content }}
              </div>
              <div class="text-[20px] ml-[64px] w-full h-[24px]">地点：{{ item.local }}</div>
              <div class="text-[20px] ml-[64px] w-full h-[24px]">时间：{{ item.time }}</div>
            </div>
          </div> -->
          <div v-for="(item, index) in filteredList" :key="index">
            <div
              class="w-[649px] h-[141px] mt-[20px] flex flex-wrap relative"
              :class="[
                item.status === '超下限'
                  ? 'bg-[url(@/assets/img/35-1.png)]'
                  : item.status === '超上限'
                  ? 'bg-[url(@/assets/img/35-2.png)]'
                  : 'bg-[url(@/assets/img/35-3.png)]',
              ]"
            >
              <div class="ml-[64px] text-[24px] h-[50px] flex items-center">
                {{ item.content }}
              </div>
              <span class="absolute top-[9px] right-[204px] text-[24px] font-[NotoSansSC]">{{ item.status }}</span>
              <span class="absolute top-[42px] right-[43px] text-[20px] font-[NotoSansSC]">报警值</span>
              <span class="absolute top-[69px] left-[525px] w-[100px] flex justify-center items-center">
                <span class="text-[24px] text-[#83DAFF]">{{ item.alarmValue }}</span>
                <span class="text-[20px] text-white">/</span>
                <span class="text-[18px] text-white">{{ item.limitValue }}</span></span
              >
              <div class="text-[20px] ml-[64px] w-full h-[24px] flex items-center">
                <img src="@/assets/img/35-4.png" class="w-[20px] h-[18px]" alt="" />
                <span class="ml-[17px]"> 环境因子：{{ item.envFactor }} </span>
              </div>
              <div class="text-[20px] ml-[64px] w-full h-[24px] flex items-center">
                <img src="@/assets/img/35-5.png" class="w-[20px] h-[18px]" alt="" />
                <span class="ml-[17px]"> 时间：{{ item.time }} </span>
              </div>
              <!-- <div class="text-[20px] ml-[64px] w-full h-[24px]">时间：{{ item.time }}</div> -->
            </div>
          </div>
        </ktAnimeScroll>
      </div>
      <div class="kt-table-empty flex justify-center items-center h-full w-full text-[24px]" v-else>
        <slot name="empty">
          <span>暂无数据</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search {
  width: 660px;
  height: 54px;
  background: linear-gradient(180deg, rgba(0, 123, 215, 0) 0%, rgba(0, 123, 215, 0.2) 100%), rgba(7, 7, 17, 0.48);
  box-shadow: 0px 3 12px 0px rgba(0, 123, 215, 0.4), 0px 2 5px 0px rgba(0, 123, 215, 0.3);
  border-radius: 4px 4px 4px 4px;
  border: 2px solid #088bdc;
}
</style>
