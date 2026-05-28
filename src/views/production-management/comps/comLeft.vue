<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import KtEchart from '@/components/utils-ui/kt-echart.vue'
import { panel } from './createOption'
import { getProductionExecutionPlan, getProductionProgress } from '@/axios/production-management'
import TimerManager from '@/utils/timerManager'

const data = ref({
  section1: {
    1: {
      当日采掘进尺: { name: '当日采掘进尺', value: 91, unit: 'm' },
      当月采掘进尺: { name: '当月采掘进尺', value: 91, unit: 'm' },
    },
    2: {
      list: [
        {
          name: '采矿',
          value: 60,
          unit: '%',
          bg: 'bg-[url(@/assets/img/25-1.png)]',
          textClass: 'text-[#789FFF]',
        },
        {
          name: '选矿',
          value: 60,
          unit: '%',
          bg: 'bg-[url(@/assets/img/25-2.png)]',
          textClass: 'text-[#62DAEF]',
        },
        {
          name: '运输',
          value: 60,
          unit: '%',
          bg: 'bg-[url(@/assets/img/25-3.png)]',
          textClass: 'text-[#62EFD3]',
        },
      ],
    },
  },
  section2: {
    1: {
      日产量: {
        name: '日产量',
        planValue: 2121.0,
        actualValue: 21.32,
        unit: '吨',
        bg: 'bg-[url(@/assets/img/26-1.png)]',
      },
      年产量: {
        name: '年产量',
        planValue: 2121.0,
        actualValue: 21.32,
        unit: '吨',
        bg: 'bg-[url(@/assets/img/26-2.png)]',
      },
    },
  },
})

let echartsData1 = ref({})

// 获取生产进度
const ProductionProgress = async () => {
  const res = await getProductionProgress({})

  if (res.data.code === 200) {
    const result = res.data.data
    data.value.section1[1]['当日采掘进尺'].value = result.dailyNum || 0
    data.value.section1[1]['当月采掘进尺'].value = result.monthlyNum || 0

    const fixedOrder = ['采矿', '选矿', '运输']
    fixedOrder.forEach((type, index) => {
      const matchedItem = result.list.find((item) => item.type === type)

      if (matchedItem) {
        data.value.section1[2].list[index].name = matchedItem.type
        data.value.section1[2].list[index].value = ((matchedItem.dailyCompleteNum / matchedItem.dailyPlanNum) * 100).toFixed(2)
        data.value.section1[2].list[index].unit = '%'
      }
    })
  }
}
// 获取生产执行计划
const ProductionExecutionPlan = async () => {
  const res = await getProductionExecutionPlan({})
  if (res.data.code === 200) {
    const { dailyPlanNum, dailyCompleteNum, productionExecutionYearPlanDTO } = res.data.data

    const planNum = Number(dailyPlanNum) || 0
    const actualNum = Number(dailyCompleteNum) || 0
    const yearPlanNum = Number(productionExecutionYearPlanDTO?.yearPlanNum) || 0
    const yearCompleteNum = Number(productionExecutionYearPlanDTO?.yearCompleteNum) || 0

    // 更新数据
    data.value.section2['1']['日产量'].planValue = planNum
    data.value.section2['1']['日产量'].actualValue = actualNum

    data.value.section2['1']['年产量'].planValue = yearPlanNum
    data.value.section2['1']['年产量'].actualValue = yearCompleteNum

    // 生成图表数据
    echartsData1.value = panel(planNum, actualNum)
  }
}

onMounted(() => {
  // echartsData1.value = panel(data.value.section2['1']['日产量'].actualValue, data.value.section2['1']['日产量'].planValue)
})

// ProductionExecutionPlan()
// ProductionProgress()
// 组件挂载时设置定时器
onMounted(() => {
  ProductionProgress()
  ProductionExecutionPlan()

  TimerManager.addTimer('productionExecutionPlan', ProductionExecutionPlan)
  TimerManager.addTimer('productionProgress', ProductionProgress)
})

onUnmounted(() => {
  TimerManager.clearTimer('productionProgress')
  TimerManager.clearTimer('productionExecutionPlan')
})
</script>
<template>
  <div class="w-[700px] top-[117px] left-[44px] absolute flex flex-col">
    <!-- 生产进度  -->
    <cus-title title="生产进度" position="left" :download="true" @import-success="ProductionProgress" />
    <!-- <cus-title title="生产进度" position="left" /> -->
    <div class="bg-[url('@/assets/img/1.png')] h-[718px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="flex gap-x-[24px] flex-wrap">
        <div v-for="(item, index) in data.section1[1]" :key="index" class="w-[318px] h-[117px] bg-[url('@/assets/img/24.png')] kt-bg-full flex flex-col">
          <div class="flex items-center">
            <div class="w-[60px] h-[60px] bg-[url('@/assets/img/24-1.png')] kt-bg-full flex-1 ml-[12px]"></div>
            <div class="flex-4">
              <div class="flex items-center mt-[10px] ml-[20px]">
                <span class="text-[24px] w-[144px] flex-3">{{ item.name }}</span>
                <div class="w-[36px] h-[15px] bg-[url('@/assets/img/24-2.png')] kt-bg-full flex justify-center items-center text-[24px] flex-1">
                  {{ item.unit }}
                </div>
              </div>
              <span class="text-[36px] text-[#62EFD3] ml-[20px]">{{ item.value }}</span>
            </div>
          </div>
          <div class="w-[299px] h-[9px] bg-[url('@/assets/img/24-3.png')] kt-bg-full line"></div>
        </div>
      </div>

      <div class="flex flex-col gap-y-[30px]">
        <div v-for="(item, index) in data.section1[2].list" key="index">
          <div class="w-[650px] h-[144px] kt-bg-full flex items-center" :class="[item.bg]">
            <div class="w-[407.31px] h-[58px] flex items-center justify-between text-[24px] font-[Source-Han-Sans-CN] ml-[201px]">
              <div class="w-[57px] text-[28px]">{{ item.name }}</div>
              <div>
                <span class="text-[48px]" :class="item.textClass">{{ item.value }}</span>
                <span class="mt-[26px] text-[20px]">{{ item.unit }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 生产计划执行 -->
    <cus-title title="生产计划执行" position="left" :download="true" @import-success="ProductionExecutionPlan" />
    <div class="bg-[url('@/assets/img/1.png')] h-[421px] w-[700px] kt-bg-full flex items-center justify-around">
      <div class="flex-2">
        <div class="w-[204px] h-[164px] bg-[url('@/assets/img/3.png')] kt-bg-full relative pl-[8px] ml-[31px]">
          <div class="w-[200px] h-[200px] pt-[12px] pr-[10px]">
            <kt-echart v-if="echartsData1" :option="echartsData1" />
          </div>
        </div>
        <div class="w-[157px] h-[38px] bg-[url('@/assets/img/4.png')] kt-bg-full flex items-center justify-center ml-[56px] mt-[33px]">
          <div class="text-[24px] font-[NotoSansSC] kt-bg-gradient3">日产量完成</div>
        </div>
      </div>
      <div class="flex-3">
        <div class="flex flex-col gap-y-[24px]">
          <div v-for="(item, index) in data.section2[1]" key="index">
            <div class="w-[366px] h-[139px] kt-bg-full" :class="item.bg">
              <div class="flex justify-between items-center">
                <div class="ml-[16px] h-[50px] flex justify-center items-center text-[24px] font-[Source-Han-Sans-CN]">{{ item.name }}</div>
                <div class="w-[36px] h-[15px] bg-[url('@/assets/img/24-2.png')] kt-bg-full flex justify-center items-center text-[20px] mr-[16px]">
                  {{ item.unit }}
                </div>
              </div>
              <div class="w-[300px] h-[60px] grid grid-cols-3 grid-rows-2 ml-[21px]">
                <span class="text-[24px] col-span-2">计划</span>
                <span class="text-[24px] text-[#83DAFF]">实际</span>
                <span class="text-[36px] font-bold col-span-2">{{ item.planValue.toFixed(2) }}</span>
                <span class="text-[36px] text-[#83DAFF] font-bold">{{ item.actualValue }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line {
  width: 160px;
  height: 8px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #62efd3 100%);
  border-radius: 0px 0px 0px 0px;
}
</style>
