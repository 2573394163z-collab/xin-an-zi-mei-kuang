<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'
import ktAnimeScroll from '@/components/kt-ui/kt-anime-scroll.vue'
import { getRealMessage, getAttendanceDetail, getAlarmInfo} from '@/axios/safety-control-factory.js'
import TimerManager from '@/utils/timerManager'

const data = ref({
  section1: {
    1: {
      在岗人数: {
        name: '在岗人数',
        value: 698,
        img: 'bg-[url(@/assets/img/8-1.png)]',
        textColor: 'text-[#62EFD3]',
      },
      // 请假人数: {
      //   name: '请假人数',
      //   value: 3,
      //   img: 'bg-[url(@/assets/img/8-2.png)]',
      //   textColor: 'text-[#62EFD3]',
      // },
      // 离职人数: {
      //   name: '离职人数',
      //   value: 6,
      //   img: 'bg-[url(@/assets/img/8-3.png)]',
      //   textColor: 'text-[#FFB348]',
      // },
    },
    2: {
      中段1: {
        name: '中段1',
        value: 120,
      },
      中段2: {
        name: '中段2',
        value: 120,
      },
      中段3: {
        name: '中段3',
        value: 120,
      },
      中段4: {
        name: '中段4',
        value: 120,
      },
      中段5: {
        name: '中段5',
        value: 120,
      },
      中段6: {
        name: '中段6',
        value: 120,
      },
      中段7: {
        name: '中段7',
        value: 120,
      },
      中段8: {
        name: '中段8',
        value: 120,
      },
    },
  },
  section2: {
    columns: [
      {
        label: '序号',
        prop: 'k1',
        dir: 'center',
        width: 1,
      },
      {
        label: '告警详情',
        prop: 'k2',
        dir: 'center',
        width: 1,
      },
      {
        label: '告警地点',
        prop: 'k3',
        dir: 'center',
        width: 3,
      },
      {
        label: '告警时间',
        prop: 'k4',
        dir: 'center',
        width: 3,
      },
      // {
      //   label: '处置状态',
      //   prop: 'k5',
      //   dir: 'center',
      //   width: 1,
      // },
    ],
    data: [
      {
        k1: '1',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
      {
        k1: '2',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
      {
        k1: '3',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
      {
        k1: '4',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
      {
        k1: '5',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
      {
        k1: '6',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
      {
        k1: '7',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        // k5: 'XXX',
      },
    ],
  },
  section3: {
    1: {
      active: true,
      icon: 'bg-[url(@/assets/img/34.png)]',
      icon1: 'bg-[url(@/assets/img/34-c.png)]',
    },
    2: {
      active: false,
      icon: 'bg-[url(@/assets/img/34.png)]',
      icon1: 'bg-[url(@/assets/img/34-c.png)]',
    },
    3: {
      active: false,
      icon: 'bg-[url(@/assets/img/34.png)]',
      icon1: 'bg-[url(@/assets/img/34-c.png)]',
    },
    4: {
      active: false,
      icon: 'bg-[url(@/assets/img/34.png)]',
      icon1: 'bg-[url(@/assets/img/34-c.png)]',
    },
    5: {
      active: false,
      icon: 'bg-[url(@/assets/img/34.png)]',
      icon1: 'bg-[url(@/assets/img/34-c.png)]',
    },
  },
})
const allRightContents = ref([
  [{ id: 'KTU-001', name: '095防跑车一', status: '正常', url: 'rtsp://admin:abc12345@172.16.89.21/streaming/channels/102' }],
  [{ id: 'KTU-002', name: '045 休息室', status: '正常', url: 'rtsp://admin:zy123456@192.168.3.117/streaming/channels/102' }],
  [{ id: 'KTU-003', name: '456竖井机房信号房', status: '正常', url: 'rtsp://admin:abc12345@172.16.89.43/streaming/channels/102' }],
  [{ id: 'KTU-004', name: '456竖井机房应急火警监控', status: '正常', url: 'rtsp://admin:zy123456@172.16.89.114/streaming/channels/102' }],
  [{ id: 'KTU-005', name: '427炸药库', status: '正常', url: 'rtsp://admin:abc12345@172.16.89.71/streaming/channels/102' }],
])
const rightContent1 = ref(allRightContents.value[0])

// 视频连接状态
const videoConnected = ref(false)

// 视频连接成功回调
const handleVideoConnected = (status) => {
  videoConnected.value = status
}

const changeActive = (index) => {
  // 1️⃣ 重置所有 active
  Object.keys(data.value.section3).forEach((key) => {
    data.value.section3[key].active = false
  })

  // 2️⃣ 设置当前 active
  data.value.section3[index].active = true

  // 重置连接状态
  videoConnected.value = false

  // 3️⃣ 切换内容（index 从 1 开始，要 -1）
  rightContent1.value = allRightContents.value[index - 1]
}

let timer = null
let currentIndex = 1

// 获取各中段人数
const fetchRealMessage = async () => {
  const params = {
    personState: -1, //人员状态-1.全部0.地面1.井口2.井下（必传）
    cardType: 0, //0.人员1.车辆（必传）
  }

  const res = await getRealMessage(params)
  if (res.data.code === 200) {
    const wzData = res.data.data.GisWzPersonInfos || []

    const areaCount = {}

    wzData.forEach((item) => {
      const wzName = item.Wz
      const personCount = item.WzNowNum || 0

      // 提取区域编号（如 "045"）
      const areaMatch = wzName.match(/^(\d+)/)
      if (areaMatch) {
        const areaNumber = areaMatch[1]

        if (areaCount[areaNumber]) {
          areaCount[areaNumber] += personCount
        } else {
          areaCount[areaNumber] = personCount
        }
      }
    })

    // 将结果转换为 section1[2] 的格式
    data.value.section1[2] = {}
    Object.keys(areaCount).forEach((key) => {
      data.value.section1[2][`${key}中段`] = {
        name: `${key}中段`,
        value: areaCount[key],
      }
    })
  }
}

// 获取在岗行人数
const fetchAttendanceDetail = async () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  
  const beginTime = `${year}-${month}-${day} 00:00:00`
  const endTime = `${year}-${month}-${day} 23:59:59`

  const params = {
    queryJson: JSON.stringify({ BeginTime: beginTime, EndTime: endTime }),
    page: 1,
    rows: 999,
  }

  const res = await getAttendanceDetail(params)
  if (res.data.code === 200) {
    data.value.section1[1]['在岗人数'].value = res.data.data?.Records || 0
  }
}

// 获取告警列表
const fetchAlarmInfo = async () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  const beginTime = `${year}-${month}-${day} 00:00:00`
  const endTime = `${year}-${month}-${day} 23:59:59`

  const params = {
    queryJson: JSON.stringify({ BeginTime: beginTime, EndTime: endTime }),
    page: 1,
    rows: 999,
  }
  const res = await getAlarmInfo(params)
  console.log('告警列表 res:', res)
  if (res.data.code === 200) {
    const list = res.data.data?.rows || []
    data.value.section2.data = list.map((item, index) => {
      const wzName = item.Wz ? item.Wz.replace(/\[.*?\]/g, '') : ''
      return {
        k1: index + 1,
        k2: item.AlarmTypeName || '',
        k3: wzName,
        k4: item.StartTime || '',
      }
    })
  }
}

onMounted(() => {
  fetchRealMessage()
  fetchAttendanceDetail()
  fetchAlarmInfo()

  TimerManager.addTimer('fetchRealMessage', fetchRealMessage)
  TimerManager.addTimer('fetchAttendanceDetail', fetchAttendanceDetail)
  TimerManager.addTimer('fetchAlarmInfo', fetchAlarmInfo)
  
  timer = setInterval(() => {
    currentIndex++
    if (currentIndex > 5) currentIndex = 1
    changeActive(currentIndex)
  }, 60000) // 1分钟
})

onUnmounted(() => {
  clearInterval(timer)
  TimerManager.clearTimer('fetchRealMessage')
  TimerManager.clearTimer('fetchAttendanceDetail')
  TimerManager.clearTimer('fetchAlarmInfo')

})
</script>
<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col pointer-events-auto">
    <!--人员在岗-->
    <cus-title title="人员在岗" />
    <div class="bg-[url('@/assets/img/1.png')] h-[331px] w-[700px] kt-bg-full">
      <div class="flex justify-around">
        <div v-for="(item, index) in data.section1[1]" key="index" class="mt-[20px]">
          <div :class="['w-[183px] h-[112px] kt-bg-full ', item.img]">
            <span class="pl-[77px] pt-[9px] text-[36px]">{{ item.value }}</span>
            <span class="pl-[8px] pt-[14px] text-[20px]">人</span>
            <span class="pl-[77px] pt-[61px] text-[24px]" :class="item.textColor">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="h-[170px] grid grid-cols-3 gap-x-[70px] ml-[38px] overflow-y-auto">
        <div v-for="(item, index) in data.section1[2]" key="index" class="mt-[20px]">
          <div class="w-[162px] h-[64px] kt-bg-full bg-[url(@/assets/img/9.png)]">
            <div class="pl-[26px] text-[24px]">{{ item.name }}</div>
            <div class="pl-[26px] -mt-[10px] text-[28px] font-bold flex">
              {{ item.value }}

              <span class="text-[20px] pt-[6px] font-normal">个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <cus-title title="当前告警列表" />
    <div class="bg-[url('@/assets/img/1.png')] h-[312px] w-[700px] kt-bg-full">
      <div class="w-[680px] h-[271px] ml-[21px] mt-[14px]">
        <cus-pj-table :columns="data.section2.columns" :data="data.section2.data" gap="4px"></cus-pj-table>
      </div>
    </div>
    <cus-title title="视频监控" />
    <div class="bg-[url('@/assets/img/1.png')] h-[420px] w-[700px] kt-bg-full flex flex-col">
      <!-- <div class="bg-[url('@/assets/img/12.png')] h-[33px] w-[192px] kt-bg-full ml-[33px] text-[24px] pl-[33px]">XXX巷道口</div> -->
      <!-- <div class="ml-[33px] mt-[7px] flex items-center justify-center bg-[url('@/assets/img/video.png')] kt-bg-full" style="height: 362px; width: 647px">
        <div class="relative">
          <video class="w-[610px] h-[343px] object-cover rounded-sm bg-gray-900" autoplay muted loop>
            <div class="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <div class="i-carbon-video-off text-4xl mb-2"></div>
              <div>视频流未连接</div>
            </div>
          </video>
        </div>
      </div> -->
      <div class="w-full h-full mt-[13px] flex flex-wrap justify-center">
        <cus-jk-video v-for="(item, index) in rightContent1" :key="index" :url="item.url" :uid="item.id" :title="item.name" />
      </div>
      <div class="w-[175px] flex justify-around ml-[260px] mt-[5px] pointer-events-auto">
        <div v-for="(item, index) in data.section3" :key="index">
          <div :class="['w-[23px] h-[10px] kt-bg-full', item.active ? item.icon1 : item.icon]" @click="changeActive(index)"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
