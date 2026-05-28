<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import KtEchart from '@/components/utils-ui/kt-echart.vue'
import { createOption1 } from './createOption'
import { getEnvMonitoring, getListAllDevice } from '@/axios/environmental-regulation'
import TimerManager from '@/utils/timerManager'

const data = ref({
  section1: {
    1: {
      粉尘浓度: {
        name: '粉尘浓度',
        value: 28,
        unit: 'mg/m³',
        img: 'bg-[url(@/assets/img/21-1.png)]',
      },
      'PM 2.5': {
        name: 'PM 2.5',
        value: 28,
        unit: 'μg/m³',
        img: 'bg-[url(@/assets/img/21-2.png)]',
      },
      'PM 10': {
        name: 'PM 10',
        value: 50,
        unit: 'μg/m³',
        img: 'bg-[url(@/assets/img/21-3.png)]',
      },
    },
    2: {
      columns: [
        {
          label: '安装位置',
          prop: 'installerAddress',
          dir: 'center',
          width: 1.5,
        },
        {
          label: '当前值',
          prop: 'realvalue',
          dir: 'center',
          width: 1,
        },
        {
          label: '是否报警',
          prop: 'isAlarmText',
          dir: 'center',
          width: 1,
        },
      ],
      data: [
        { installerAddress: '1号风门', realvalue: '0.35', isAlarmText: '否' },
        { installerAddress: '2号风门', realvalue: '0.42', isAlarmText: '否' },
        { installerAddress: '3号风门', realvalue: '0.28', isAlarmText: '否' },
        { installerAddress: '主巷道A', realvalue: '1.15', isAlarmText: '是' },
        { installerAddress: '主巷道B', realvalue: '0.56', isAlarmText: '否' },
        { installerAddress: '回风巷1', realvalue: '0.73', isAlarmText: '否' },
        { installerAddress: '回风巷2', realvalue: '2.01', isAlarmText: '是' },
        { installerAddress: '运输巷1', realvalue: '0.44', isAlarmText: '否' },
        { installerAddress: '运输巷2', realvalue: '0.61', isAlarmText: '否' },
        { installerAddress: '采区巷道', realvalue: '0.88', isAlarmText: '否' },
      ],
    },
  },
  section2: {
    1: {
      name: '设备总数',
      total: 70,
      unit: '个',
    },
    2: {
      1: {
        name: '风速感应器',
        service: 18, //1221
        alarm: 0, //212
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-2.png)]',
        color: 'text-[#62EFD3]',
        width: 'w-[318px]',
        height: 'h-[130px]',
        bg: 'bg-[url(@/assets/img/22.png)] h-[130px] w-[318px]',
      },
      2: {
        name: '识别定位器',
        service: 34,
        alarm: 0,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-3.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22.png)] h-[130px] w-[318px]',
      },
      3: {
        name: '一氧化碳',
        service: 13,
        alarm: 0,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-4.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22-b.png)] h-[221px] w-[208px]',
      },
      4: {
        name: '压力传感器',
        service: 2,
        alarm: 0,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-5.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22-b.png)] h-[221px] w-[208px]',
      },
      5: {
        name: '扬尘噪声监测',
        service: 3,
        alarm: 0,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-6.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22-b.png)] h-[221px] w-[208px]',
      },
    },
  },
})
const splitTableData = (table) => {
  const mid = Math.ceil(table.length / 2)
  const firstHalf = table.slice(0, mid)
  const secondHalf = table.slice(mid)
  return [firstHalf, secondHalf]
}
//获取环境监测数据
const EnvMonitoring = async () => {
  const res = await getEnvMonitoring()
  if (res.data.code === 200) {
    const result = res.data.data
    result.forEach((item) => {
      const { pm25, pm10, tsp } = item
      data.value.section1[1]['PM 2.5'].value = pm25
      data.value.section1[1]['PM 10'].value = pm10
      data.value.section1[1]['粉尘浓度'].value = tsp
    })
  }
}
// 获取安全监控设备定义以及实时信息
const fetchDeviceList = async () => {
  const res = await getListAllDevice()
  if (res.data.code === 200) {
    const result = res.data.data || []
    const targetCodes = ['00001A1200', '00003A1500']

    const filteredData = result
      .filter(item => targetCodes.includes(item.deviceCode))
      .map((item) => {
        const valueWithUnit = `${item.realValue || '-'}${item.unitName || ''}`
        return {
          installerAddress: item.installerAddress || '-',
          realvalue: valueWithUnit,
          isAlarmText: item.isAlarm === '1' ? '是' : '否',
        }
      })
    // 3. 赋值给表格数据
    data.value.section1[2].data = filteredData
  }
}
// 组件挂载时设置定时器
onMounted(() => {
  EnvMonitoring()
  fetchDeviceList()

  TimerManager.addTimer('envMonitoring', EnvMonitoring)
  TimerManager.addTimer('deviceList', fetchDeviceList, 1000) 
})

onUnmounted(() => {
  TimerManager.clearTimer('envMonitoring')
  TimerManager.clearTimer('deviceList')
})
</script>
<template>
  <div class="w-[700px] top-[117px] left-[44px] absolute flex flex-col pointer-events-auto">
    <!-- 环境监测  -->
    <!-- <cus-title title="环境监测" position="left" :download="true" @import-success="EnvMonitoring" /> -->
    <cus-title title="环境监测" position="left" />
    <div class="bg-[url('@/assets/img/1.png')] h-[621px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="relative w-full">
        <div class="absolute left-[20px] w-[38px] h-[38px] bg-[url('@/assets/img/10.png')] kt-bg-full"></div>
        <div class="absolute left-[60px] text-[24px] font-[NotoSansSC]">地表当天空气质量</div>
      </div>
      <div class="flex items-center justify-around w-full h-[221px]">
        <div v-for="(item, index) in data.section1[1]" :key="index">
          <div class="w-[200px] h-[221px] kt-bg-full" :class="item.img">
            <div class="text-[24px] font-[Source-Han-Sans-CN] flex justify-center pt-[123px]">{{ item.name }}</div>
            <div class="flex justify-center items-center">
              <div class="text-[36px] font-[Source-Han-Sans-CN] flex justify-center">{{ item.value }}</div>
              <div class="text-[20px] font-[Source-Han-Sans-CN] flex justify-center ml-[12px]">{{ item.unit }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="relative w-full flex justify-center items-center">
        <div class="absolute left-[20px] w-[38px] h-[38px] bg-[url('@/assets/img/10.png')] kt-bg-full"></div>
        <div class="absolute left-[60px] text-[24px] font-[NotoSansSC]">井下当天空气质量</div>
        <!-- <div class="flex flex-nowrap gap-[5px] ml-[386px] pointer-events-auto">
          <div v-for="(item, index) in data.section1['2']" :key="index">
            <div
              class="w-[96px] h-[28px] kt-bg-full pointer-events-auto flex justify-center items-center"
              :class="[item.active ? item.bg : item.bg2]"
              @click="handleSelect(index)"
            >
              <span class="text-[20px]">{{ item.name }}</span>
            </div>
          </div>
        </div> -->
      </div>
      <!-- <div class="bg-[url('@/assets/img/1.png')] h-[312px] w-[700px] kt-bg-full"> -->
      <div class="flex w-full">
        <!-- <div class="w-[325px] h-[222px] ml-[21px] mt-[14px]">
          <cus-pj-table :columns="data.section1['2'][select].columns" :data="splitTableData(data.section1['2'][select].data)[0]" gap="4px" sl="s2">
          </cus-pj-table>
        </div>
        <div class="w-[325px] h-[222px] ml-[21px] mt-[14px]">
          <cus-pj-table :columns="data.section1['2'][select].columns" :data="splitTableData(data.section1['2'][select].data)[1]" gap="4px" sl="s2">
          </cus-pj-table>
        </div> -->
        <!-- 调整 -->
        <div class="w-full h-[222px] px-[21px] mt-[14px]">
          <cus-pj-table :columns="data.section1[2].columns" :data="data.section1[2].data" gap="4px" sl="s2"> </cus-pj-table>
        </div>
      </div>
      <!-- </div> -->
      <!-- <div class="w-[700px] h-[252px] pointer-events-auto">
        <kt-echart :option="data.section1[2].options.option1" />
      </div> -->
    </div>
    <!-- 传感器设备总量统计 -->
    <cus-title title="传感器设备总量统计" position="left" />
    <div class="bg-[url('@/assets/img/1.png')] h-[522px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/22-1.png')] mt-[20px] flex items-center">
        <div class="ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section2['1'].name }}</div>
        <div class="text-[48px] text-[#83DAFF] ml-[292px]">{{ data.section2['1'].total }}</div>
        <div class="text-[20px] ml-[7px] mt-[22px]">{{ data.section2['1'].unit }}</div>
      </div>
      <div class="flex flex-wrap justify-around mt-[22px] mb-[15px] cursor-pointer gap-[24px]">
        <div v-for="(item, index) in data.section2['2']" :key="index" class="kt-bg-full relative" :class="[item.bg]">
          <div class="flex">
            <div class="ml-[16px] h-[50px] flex justify-center items-center text-[24px] font-[Source-Han-Sans-CN]">{{ item.name }}</div>
            <div class="absolute right-[20px] top-[7px] w-[20px] text-[20px]">{{ item.unit }}</div>
          </div>
          <div class="flex">
            <div class="w-[60px] h-[60px] kt-bg-full bg-[url(@/assets/img/22-m.png)] ml-[16px] mt-[5px]">
              <div class="w-[55px] h-[55px] kt-bg-full flex justify-center items-center" :class="item.icon"></div>
            </div>
            <div class="flex flex-wrap">
              <div class="ml-[40px] flex flex-col">
                <span class="w-[80px] flex justify-end items-center text-[20px] font-[Source-Han-Sans-CN]">设备总数</span>
                <span class="flex justify-end items-center text-[24px] font-[Source-Han-Sans-CN]" :class="item.color">{{ item.service }}</span>
              </div>
              <div class="ml-[30px] flex flex-col">
                <span class="w-[80px] flex justify-end items-center text-[20px] font-[Source-Han-Sans-CN]">报警数</span>
                <span class="flex justify-end items-center text-[24px] font-[Source-Han-Sans-CN]" :class="item.color">{{ item.alarm }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
