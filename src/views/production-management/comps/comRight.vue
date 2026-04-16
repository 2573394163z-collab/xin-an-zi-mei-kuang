<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'
import { getGroupStatus, getDefaultEntity, getGisRealDeptPersonInfos } from '@/axios/production-management'
import TimerManager from '@/utils/timerManager'

const data = ref({
  section1: {
    1: {
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

// 存储具体人员名单
const leaderList = ref([]) // 带班领导
const cadreList = ref([]) // 干部

// 获取班组状态
const GroupStatus = async () => {
  const res = await getGroupStatus({})
  if (res.data.code === 200) {
    const { dailyGroupRealNum, dailyGroupPlanNum } = res.data.data
    data.value.section1['1']['出勤率'].value = ((dailyGroupRealNum / dailyGroupPlanNum) * 100).toFixed(0)
  }
}

// 获取默认班次
const fetchDefaultEntity = async () => {
  const res = await getDefaultEntity()
  if (res.data.code === 200) {
    const d = res.data.data
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()

    for (let i = 1; i <= 3; i++) {
      const name = d[`bcmc${i}`]
      const start = d[`kssj${i}`]
      const end = d[`jssj${i}`]

      if (name && start && end) {
        const [sH, sM] = start.split(':').map(Number)
        const [eH, eM] = end.split(':').map(Number)
        let startMin = sH * 60 + sM
        let endMin = eH * 60 + eM

        let active = false
        if (startMin <= endMin) {
          active = nowMinutes >= startMin && nowMinutes < endMin
        } else {
          active = nowMinutes >= startMin || nowMinutes < endMin
        }

        if (active) {
          data.value.section2['1'].type = name
        }
      }
    }
  }
}

// 获取实时人员信息
const fetchRealMessage = async () => {
  const params = {
    personState: 2,
    cardType: 0,
  }
  const res = await getGisRealDeptPersonInfos(params)

  if (res.data.code === 200) {
    const result = res.data.data
    const deptInfos = result.GisDeptPersonInfos || []

    leaderList.value = []
    cadreList.value = []

    deptInfos.forEach((dept) => {
      const personInfos = dept.PersonInfos || []
      personInfos.forEach((person) => {
        if (person.PersonState === 2) {
          if (person.IsSubstituteLeader === '是') {
            leaderList.value.push(person.Name || '未知')
          }
          if (person.IsCadre === '干部') {
            cadreList.value.push(person.Name || '未知')
          }
        }
      })
    })

    // 更新统计人数
    personnelList.value[0].count = leaderList.value.length
    personnelList.value[1].count = cadreList.value.length
  }
}

onMounted(() => {
  GroupStatus()
  fetchDefaultEntity()
  fetchRealMessage()

  TimerManager.addTimer('groupStatus', GroupStatus)
  TimerManager.addTimer('defaultEntity', fetchDefaultEntity, 5000)
  TimerManager.addTimer('realMessage', fetchRealMessage, 5000)
})

onUnmounted(() => {
  TimerManager.clearTimer('groupStatus')
  TimerManager.clearTimer('defaultEntity')
  TimerManager.clearTimer('realMessage')
})
</script>

<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col">
    <!-- 班组状态 -->
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

    <div class="bg-[url('@/assets/img/1.png')] h-[508px] w-[700px] kt-bg-full flex flex-col items-center px-[20px] py-[10px] pointer-events-auto">
      <!-- 当前班次头部 -->
      <div class="w-full h-[80px] kt-bg-full bg-[url('@/assets/img/production/title.png')] flex items-center justify-between px-[30px] relative">
        <div class="flex items-center gap-[15px]">
          <span class="text-[32px] font-bold">当前班次</span>
        </div>
        <span class="text-[36px] text-[#83DAFF] font-bold mr-[58px]">{{ data.section2['1'].type }}</span>
      </div>

      <!-- 当前井下带班领导 -->
      <div class="w-full mt-[13px]">
        <div class="w-full h-[65.91px] bg-[url('@/assets/img/production/listHeader.png')] flex items-center justify-center text-[28px] font-bold">
          <span class="bg-gradient-to-t from-[#83bdf3] to-white bg-clip-text text-transparent"> 当前井下带班领导 </span>
        </div>
        <div class="w-full h-[58px] max-h-[120px] p-[5px] overflow-y-auto grid grid-cols-4 gap-[10px] bg-[url('@/assets/img/production/listBg.png')]">
          <div
            v-for="(name, index) in leaderList"
            :key="index"
            class="w-[156px] h-[48px] bg-[url('@/assets/img/production/listItem.png')] text-white text-center text-[24px] flex items-center justify-center"
          >
            {{ name }}
          </div>
          <div v-if="leaderList.length === 0" class="col-span-4 h-[48px] text-white text-center text-[24px] flex items-center justify-center">暂无数据</div>
        </div>
      </div>

      <!-- 当前井下干部 -->
      <div class="w-full mt-[20px]">
        <div class="w-full h-[65.91px] bg-[url('@/assets/img/production/listHeader.png')] flex items-center justify-center text-[28px] font-bold">
          <span class="bg-gradient-to-t from-[#94f8e2] to-white bg-clip-text text-transparent"> 当前井下干部 </span>
        </div>
        <div class="w-full h-[174px] max-h-[174px] p-[5px] overflow-y-auto grid grid-cols-4 gap-[10px] bg-[url('@/assets/img/production/listBg2.png')]">
          <div
            v-for="(name, index) in cadreList"
            :key="index"
            class="w-[156px] h-[48px] bg-[url('@/assets/img/production/listItem2.png')] text-white text-center text-[24px] flex items-center justify-center"
          >
            {{ name }}
          </div>
          <div v-if="cadreList.length === 0" class="col-span-4 h-full text-white text-center text-[24px] flex items-center justify-center">暂无数据</div>
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

<style scoped>
/* 可添加额外样式 */
</style>
