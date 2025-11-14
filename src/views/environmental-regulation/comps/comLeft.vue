<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import KtEchart from '@/components/utils-ui/kt-echart.vue'
import { createOption1 } from './createOption'

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
      options: {
        option1: createOption1(),
      },
    },
  },
  section2: {
    1: {
      name: '设备总数',
      total: 698,
      unit: '个',
    },
    2: {
      1: {
        name: '风速感应器',
        service: 1221,
        alarm: 212,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-2.png)]',
        color: 'text-[#62EFD3]',
        width: 'w-[318px]',
        height: 'h-[130px]',
        bg: 'bg-[url(@/assets/img/22.png)] h-[130px] w-[318px]',
      },
      2: {
        name: '识别定位器',
        service: 1221,
        alarm: 212,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-3.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22.png)] h-[130px] w-[318px]',
      },
      3: {
        name: '一氧化碳',
        service: 1221,
        alarm: 212,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-4.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22-b.png)] h-[221px] w-[208px]',
      },
      4: {
        name: '压力传感器',
        service: 1221,
        alarm: 212,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-5.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22-b.png)] h-[221px] w-[208px]',
      },
      5: {
        name: '扬尘噪声监测',
        service: 1221,
        alarm: 212,
        unit: '个',
        icon: 'bg-[url(@/assets/img/22-6.png)]',
        color: 'text-[#62EFD3]',
        bg: 'bg-[url(@/assets/img/22-b.png)] h-[221px] w-[208px]',
      },
    },
  },
})
</script>
<template>
  <div class="w-[700px] top-[117px] left-[44px] absolute flex flex-col">
    <!-- 环境监测  -->
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
      <div class="relative w-full">
        <div class="absolute left-[20px] w-[38px] h-[38px] bg-[url('@/assets/img/10.png')] kt-bg-full"></div>
        <div class="absolute left-[60px] text-[24px] font-[NotoSansSC]">井下当天空气质量</div>
      </div>
      <div class="w-[700px] h-[252px]">
        <kt-echart :option="data.section1[2].options.option1" />
      </div>
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
