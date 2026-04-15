<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'
import { getGroupStatus, getDefaultEntity, getGisRealDeptPersonInfos } from '@/axios/production-management'
import TimerManager from '@/utils/timerManager'

const data = ref({
  section1: {
    1: {
      // 考勤率: {
      //   name: '考勤率',
      //   value: 94,
      //   unit: '%',
      //   bg: 'bg-[url(@/assets/img/27-1.png)]',
      // },
      出勤率: {
        name: '出勤率',
        value: 94,
        unit: '%',
        bg: 'bg-[url(@/assets/img/27-2.png)]',
      },
    },
  },
  section2: {
    1: {
      name: '当前班次',
      type: '早班',
    },
    shifts: [
      { name: '早班', start: '0:00', end: '08:00', active: true },
      { name: '中班', start: '08:00', end: '16:00', active: false },
      { name: '晚班', start: '16:00', end: '23:59', active: false },
    ],
  },
  section3: {
    1: {
      name: '设备总数',
      total: 31,
      unit: '个',
    },
    2: {
      设备开机: {
        name: '设备开机',
        total: 31,
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
      设备异常: {
        name: '设备异常',
        total: 0,
        unit: '个',
        textColor: '#D5C944',
      },
    },
  },
})
const personnelList = ref([
  {
    title: '当前井下带班领导',
    count: 0,
    bgClass: 'bg-[url(@/assets/img/production/bg4.png)]',
    gradient: 'linear-gradient(to top, #83bdf3 , #ffffff)'
  },
  {
    title: '当前井下干部',
    count: 0,
    bgClass: 'bg-[url(@/assets/img/production/bg5.png)]',
    gradient: 'linear-gradient(to top, #94f8e2, #ffffff)'
  },
])

const GroupStatus = async () => {
  const res = await getGroupStatus({})
  console.log(res)
  if (res.data.code === 200) {
    const { dailyGroupRealNum, dailyGroupPlanNum } = res.data.data
    data.value.section1['1']['出勤率'].value = ((dailyGroupRealNum / dailyGroupPlanNum) * 100).toFixed(0)
    // data.value.section1[1].考勤率.value = attendanceRate
  }
}

// 获取默认班次
const fetchDefaultEntity = async () => {
  const res = await getDefaultEntity()
  if (res.data.code === 200) {
    const d = res.data.data
    // const shifts = []

    // 获取当前时间（分钟数）用于匹配
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    // 循环处理三个班次
    for (let i = 1; i <= 3; i++) {
      const name = d[`bcmc${i}`]
      const start = d[`kssj${i}`]
      const end = d[`jssj${i}`]

      if (name && start && end) {
        // 计算开始和结束时间的分钟数
        const [sH, sM] = start.split(':').map(Number)
        const [eH, eM] = end.split(':').map(Number)
        let startMin = sH * 60 + sM
        let endMin = eH * 60 + eM

        // 处理跨天情况（例如 16:00 - 00:00）
        let active = false
        if (startMin <= endMin) {
          active = nowMinutes >= startMin && nowMinutes < endMin
        } else {
          // 跨天逻辑
          active = nowMinutes >= startMin || nowMinutes < endMin
        }

        // shifts.push({
        //   name,
        //   start,
        //   end,
        //   active,
        // })

        if (active) {
          data.value.section2['1'].type = name
        }
      }
    }

    // data.value.section2.shifts = shifts
  }
}

const fetchRealMessage = async () => {
   const params = {
    personState: 2,
    cardType: 0
  }
  const res = await getGisRealDeptPersonInfos(params)
  
  if (res.data.code === 200) {
    const result = res.data.data
    const deptInfos = result.GisDeptPersonInfos || []

    let leaderCount = 0 // 带班领导人数
    let cadreCount = 0 // 干部人数
    
    // 遍历所有部门
    deptInfos.forEach(dept => {
      const personInfos = dept.PersonInfos || []
      
      // 遍历部门内所有人员
      personInfos.forEach(person => {
        if (person.PersonState === 2) {
          // 统计带班领导
          if (person.IsSubstituteLeader === '是') {
            leaderCount++
          }
          
          // 统计干部
          if (person.IsCadre === '干部') {
            cadreCount++
          }
        }
      })
    })
    
    // 更新UI显示
    personnelList.value[0].count = leaderCount
    personnelList.value[1].count = cadreCount
  }
}

onMounted(() => {
  GroupStatus()
  fetchDefaultEntity()
  fetchRealMessage()

  TimerManager.addTimer('groupStatus', GroupStatus)
  TimerManager.addTimer('defaultEntity', fetchDefaultEntity, 5000) //5秒刷新
  TimerManager.addTimer('realMessage', fetchRealMessage, 5000) //5秒刷新
})

onUnmounted(() => {
  TimerManager.clearTimer('groupStatus')
  TimerManager.clearTimer('defaultEntity')
  TimerManager.clearTimer('realMessage')
})
</script>
<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col">
    <!-- 班组状态  -->
    <cus-title title="班组状态" position="right" :download="true" @import-success="GroupStatus" />

    <div class="bg-[url('@/assets/img/1.png')] h-[180px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[650px] flex items-center justify-around">
        <div v-for="(item, index) in data.section1[1]" key="index">
          <div class="w-[224px] h-[112px] kt-bg-full" :class="item.bg">
            <div class="w-[140px] ml-[91px] grid grid-cols-2 grid-rows-2">
              <div class="text-[36px]">{{ item.value }}</div>
              <div class="text-[20px] flex items-center">{{ item.unit }}</div>
              <div class="text-[24px] col-span-2 text-[#62EFD3]">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 值带班信息 -->
    <cus-title title="值带班信息" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[508px] w-[700px] kt-bg-full flex flex-col items-center px-[20px] py-[30px]">
      <!-- 当前班次头部 -->
      <div class="w-full h-[80px] bg-[url('@/assets/img/production/title.png')] flex items-center justify-between px-[30px] relative">
        <div class="flex items-center gap-[15px]">
          <span class="text-[32px] font-bold">当前班次</span>
        </div>
        <span class="text-[36px] text-[#83DAFF] font-bold mr-[58px]">{{ data.section2['1'].type }}</span>
      </div>

      <!-- 班次表格 -->
      <!-- <div class="w-full flex flex-col gap-[15px]">
        <div class="flex justify-end gap-[20px] pr-[20px]">
          <div class="w-[254px] h-[66px] bg-[url('@/assets/img/production/bg.png')] kt-flex text-[#FFFFFF] text-[24px] relative">开始</div>
          <div class="w-[254px] h-[66px] bg-[url('@/assets/img/production/bg.png')] kt-flex text-[#62EFD3] text-[24px] relative">结束</div>
        </div>
        <div
          v-for="(item, index) in data.section2.shifts"
          :key="index"
          class="w-full h-[73px] bg-[url(@/assets/img/production/bg2.png)] flex items-center border"
          :class="[item.active ? 'border-[#FFFFFF] border-[3px]' : '']"
        >
          <div class="w-[120px] h-full flex items-center justify-center text-[28px] relative">
            {{ item.name }}
          </div>
          <div class="flex-1 flex items-center justify-around text-[28px] px-[40px]">
            <span>{{ item.start }}</span>
            <span>{{ item.end }}</span>
          </div>
        </div>
      </div> -->

      <div class="w-full flex justify-around gap-[20px]">
        <div
          v-for="(item, index) in personnelList"
          :key="index"
          class="w-[320px] h-[369px] relative flex flex-col items-center justify-center"
          :class="[item.bgClass]"
        >
          <!-- 标题 -->
          <div class=" text-[24px] text-center mt-[219px] font-[NotoSansSC]"  :style="{ 
    background: item.gradient,
    '-webkit-background-clip': 'text',
    'background-clip': 'text',
    '-webkit-text-fill-color': 'transparent'
  }">{{ item.title }}</div>

          <!-- 人数 -->
          <div class="text-white text-[36px] font-bold  mt-[13px]">{{ item.count }} <span class="text-[24px]">人</span></div>
        </div>
      </div>
    </div>
    <!-- 设备与运输 -->
    <cus-title title="设备与运输" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[367px] w-[700px] kt-bg-full flex flex-wrap items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/22-1.png')] mt-[20px] flex items-center">
        <span class="ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section3['1'].name }}</span>
        <span class="text-[48px] text-[#83DAFF] ml-[292px]">{{ data.section3['1'].total }}</span>
        <span class="text-[20px] ml-[7px] mt-[22px]">{{ data.section3['1'].unit }}</span>
      </div>
      <div class="bg-[url('@/assets/img/2.png')] kt-bg-full w-[651px] h-[130px] flex justify-around pl-[115px]">
        <div v-for="(item, index) in data.section3['2']" :key="index">
          <div class="flex flex-wrap mt-[23px] w-[100px]">
            <div class="text-[36px]">{{ item.total }}</div>
            <div class="ml-[6px] mt-[16px] text-[20px]">{{ item.unit }}</div>
            <div class="text-[24px] font-[NotoSansSC]" :style="{ color: item.textColor }">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
