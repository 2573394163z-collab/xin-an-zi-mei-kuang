<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'
import { createOption2 } from './createOption'
import cusTable2 from '@/components/my-ui/cus-table2.vue'
import ktAnimeScroll from '@/components/kt-ui/kt-anime-scroll.vue'

const data = ref({
  section1: {
    1: {
      value: '92%',
    },
    2: {
      name: '废水排放量',
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
  section3: {
    1: {
      content: '15103采面上隅角-温度超标，当前监测为为...',
      local: 'XXXXXXXXXXX',
      time: '2025年9月24日 14:45:34',
      status: '已完成',
    },
    2: {
      content: '15103采面上隅角-温度超标，当前监测为为...',
      local: 'XXXXXXXXXXX',
      time: '2025年9月24日 14:45:34',
      status: '待处理',
    },
    3: {
      content: '15103采面上隅角-温度超标，当前监测为为...',
      local: 'XXXXXXXXXXX',
      time: '2025年9月24日 14:45:34',
      status: '已完成',
    },
    4: {
      content: '15103采面上隅角-温度超标，当前监测为为...',
      local: 'XXXXXXXXXXX',
      time: '2025年9月24日 14:45:34',
      status: '已完成',
    },
    5: {
      content: '15102采面上隅角-温度超标，当前监测为为...',
      local: '重庆',
      time: '2025年10月24日 14:45:34',
      status: '已完成',
    },
  },
})

const searchKey = ref('')
const scrollRef = ref(null)

const filteredList = computed(() => {
  const key = searchKey.value.trim()
  if (!key) return Object.values(data.value.section3)

  return Object.values(data.value.section3).filter((item) => {
    return item.content.includes(key) || item.local.includes(key) || item.time.includes(key)
  })
})

const search = () => {
  nextTick(() => {
    scrollRef.value?.reset()
  })
  console.log(filteredList.value)
}
</script>
<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col">
    <!-- 水资源与排放  -->
    <cus-title title="水资源与排放" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[180px] w-[700px] kt-bg-full flex items-center justify-around">
      <div class="w-[207px] h-[207px] bg-[url('@/assets/img/31-1.png')] kt-bg-full flex items-center justify-center">
        <span class="text-[32px]">{{ data.section1['1'].value }}</span>
      </div>
      <div class="w-[465px] h-[103px] bg-[url('@/assets/img/31-2.png')] kt-bg-full mr-[30px] flex items-center justify-around">
        <span class="text-[28px] flex-3 ml-[15px]">{{ data.section1['2'].name }}</span>
        <span class="text-[48px] text-[#83DAFF] flex-3 flex justify-end">{{ data.section1['2'].value }}</span>
        <span class="text-[20px] flex-1 flex justify-center">{{ data.section1['2'].unit }}</span>
      </div>
    </div>
    <!-- 水资源与排放 -->
    <cus-title title="水资源与排放" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[311px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/23.png')] mt-[20px] flex items-center">
        <div class="ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section2['1'].name }}</div>
        <div class="text-[48px] text-[#83DAFF] ml-[292px]">{{ data.section2['1'].total }}</div>
        <div class="text-[20px] ml-[7px] mt-[22px]">{{ data.section2['1'].unit }}</div>
      </div>
      <div class="w-[700px] h-[139px]">
        <kt-echart :option="data.section2[2].options.option1" />
      </div>
    </div>
    <!-- 告警列表 -->
    <!-- 告警列表 -->
    <cus-title title="告警列表" position="right" />

    <div class="bg-[url('@/assets/img/1.png')] h-[572px] w-[700px] kt-bg-full flex flex-wrap justify-center overflow-hidden">
      <div class="relative w-[660px] mt-[15px]">
        <input class="search text-[24px] pl-[16px]" placeholder="请输入关键字" v-model="searchKey" />
        <div class="w-[32px] h-[32px] bg-[url(@/assets/img/33.png)] absolute top-[11px] right-[22px]" @click="search()"></div>
      </div>
      <!-- 自动滚动区域 -->
      <div class="w-full h-[453px] ml-[20px] mt-[22px] mb-[28px]">
        <ktAnimeScroll ref="scrollRef">
          <div v-for="(item, index) in filteredList" :key="index">
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
          </div>
        </ktAnimeScroll>
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
