<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import KtEchart from '@/components/utils-ui/kt-echart.vue'
import { panel, pie, createOption1 } from './createOption'

const data = ref({
  section1: {
    1: {
      name: '设备总数',
      total: 698,
      unit: '个',
    },
    2: {
      设备开机: {
        name: '设备开机',
        total: 698,
        unit: '个',
        textColor: '#62EFD3',
      },
      设备停机: {
        name: '设备停机',
        total: 698,
        unit: '个',
        textColor: '#FFB348',
      },
      设备故障: {
        name: '设备故障',
        total: 33,
        unit: '个',
        textColor: '#FF6969',
      },
    },
  },
  section2: {
    隐患总数: {
      name: '隐患总数',
      total: 2121,
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
    options: {
      option1: createOption1(),
    },
    2: {
      天: {
        name: '天',
        active: true,
        bg: 'bg-[url(@/assets/img/7-1.png)]',
        bg2: 'bg-[url(@/assets/img/7-2.png)]',
      },
      周: {
        name: '周',
        active: false,
        bg: 'bg-[url(@/assets/img/7-1.png)]',
        bg2: 'bg-[url(@/assets/img/7-2.png)]',
      },
      月: {
        name: '月',
        active: false,
        bg: 'bg-[url(@/assets/img/7-1.png)]',
        bg2: 'bg-[url(@/assets/img/7-2.png)]',
      },
    },
  },
})

let echartsData1 = ref({})
let echartsData2 = ref({})
const chartRef = ref(null)

onMounted(() => {
  nextTick(() => {
    const chartInstance = chartRef.value?.chart // ✅ 获取 ECharts 实例

    // 监听图例切换事件
    chartInstance.on('legendselectchanged', (params) => {
      const clickedName = params.name // "天"、"周"、"月"
      // 更新按钮背景状态
      Object.keys(data.value.section3['2']).forEach((key) => {
        data.value.section3['2'][key].active = key === clickedName
      })
    })
  })
})

onMounted(() => {
  echartsData1.value = panel(2.5, 5)
  echartsData2.value = pie(data.value.section3['1'].data)
})
</script>
<template>
  <div class="w-[700px] top-[117px] left-[44px] absolute flex flex-col">
    <!-- 设备安全检测  -->
    <cus-title title="设备安全检测" position="left" />
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
    <cus-title title="隐患治理" position="left" />
    <div class="bg-[url('@/assets/img/1.png')] h-[282px] w-[700px] kt-bg-full flex items-center justify-around">
      <div class="flex-2">
        <div class="w-[204px] h-[164px] bg-[url('@/assets/img/3.png')] kt-bg-full relative pl-[8px]">
          <div class="w-[200px] h-[200px] pt-[12px] pr-[10px]">
            <kt-echart v-if="echartsData1" :option="echartsData1" />
          </div>
        </div>
        <div class="w-[157px] h-[38px] bg-[url('@/assets/img/4.png')] kt-bg-full flex items-center justify-center ml-[43px] mt-[33px]">
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
    <cus-title title="监控与告警" position="left" />
    <div class="bg-[url('@/assets/img/1.png')] h-[492px] w-[700px] kt-bg-full flex flex-col items-center justify-center relative">
      <!--第一部分 -->
      <div class="relative w-full">
        <div class="absolute top-[47px] left-[110px] w-[38px] h-[38px] bg-[url('@/assets/img/11.png')] kt-bg-full"></div>
        <div class="grid grid-cols-2 grid-rows-3 gap-y-[3px] gap-x-[33px] ml-[231px]">
          <div v-for="(item, index) in data.section3['1'].data" :key="index">
            <div class="w-[200px] h-[43px] bg-[url('@/assets/img/6.png')] kt-bg-full"></div>
          </div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full">
          <div class="w-[700px] h-[151px]">
            <kt-echart v-if="echartsData2" :option="echartsData2" />
          </div>
        </div>
      </div>
      <!--第二部分 -->
      <div class="relative w-full mt-[35px]">
        <div class="absolute top-[10px] left-[60px] w-[38px] h-[38px] bg-[url('@/assets/img/10.png')] kt-bg-full"></div>
        <div class="absolute top-[10px] left-[110px] text-[24px] font-[NotoSansSC]">近期告警趋势分析</div>
        <div class="flex flex-nowrap gap-[5px] ml-[540px]">
          <div v-for="(item, index) in data.section3['2']" :key="index">
            <div class="w-[48px] h-[28px] kt-bg-full pointer-events-auto" :class="[item.active ? item.bg : item.bg2]"></div>
          </div>
        </div>
        <div class="w-[700px] h-[290px] -mt-[62px]">
          <kt-echart :option="data.section3.options.option1" ref="chartRef" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
