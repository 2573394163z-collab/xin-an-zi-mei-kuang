<script setup>
import comLeft from './comps/comLeft.vue'
import comRight from './comps/comRight.vue'
import { watchUEEvents, sendToUE } from '@/ue'

const selectedRoam = ref('全部巷道')
const selectedAll = ref(false)
const data = ref({
  day: { data1: 0, data2: 0, data3: 0, data4: 5, data5: 5, data6: 5 },
  roam: {
    全部巷道: {
      name: '全部巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '-55巷道': {
      name: '-55巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '-5巷道': {
      name: '-5巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '45巷道': {
      name: '45巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '95巷道': {
      name: '95巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '145巷道': {
      name: '145巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '195巷道': {
      name: '195巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '245巷道': {
      name: '245巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '295巷道': {
      name: '295巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '345巷道': {
      name: '345巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '390巷道': {
      name: '390巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '427巷道': {
      name: '427巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '435巷道': {
      name: '435巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '456巷道': {
      name: '456巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '485巷道': {
      name: '485巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '535巷道': {
      name: '535巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '585巷道': {
      name: '585巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
  },
  left1: {
    视频监控: {
      name: '视频监控',
      active: true,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left1/3.png)]',
      icon2: 'bg-[url(@/assets/img/left1/3-c.png)]',
    },
    广播: {
      name: '广播',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left1/4.png)]',
      icon2: 'bg-[url(@/assets/img/left1/4-c.png)]',
    },
    通讯: {
      name: '通讯',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left1/5.png)]',
      icon2: 'bg-[url(@/assets/img/left1/5-c.png)]',
    },
  },
})

const handleAll = () => {
  selectedAll.value = !selectedAll.value
}
const handleSelect = (index) => {
  // 切换选中状态（多选）
  data.value.left1[index].active = !data.value.left1[index].active

  // 获取当前所有选中的项
  const selectedItems = Object.values(data.value.left1)
    .filter((item) => item.active)
    .map((item) => item.name)

  // 发送 UE 消息，包含所有已选项
  sendToUE('c3-dev-type', {
    item: '设备',
    selected: selectedItems,
  })
}
const handleSelectRoam = (index) => {
  Object.values(data.value.roam).forEach((item) => (item.active = false))
  data.value.roam[index].active = true
  selectedRoam.value = data.value.roam[index].name
  sendToUE('c1-click', {
    item: '全部巷道',
    selectedAll: selectedAll.value,
    hovered: selectedRoam.value, // 点击时 hovered = 当前选中巷道
    selected: selectedRoam.value, // 同步 selected = 当前选中巷道
  })
}

const handleHoverRoam = (index) => {
  // 鼠标悬停时发送 UE 消息
  sendToUE(`c1-hover`, {
    item: '全部巷道',
    selectedAll: selectedAll.value,
    hovered: data.value.roam[index].name,
    selected: selectedRoam.value,
  })
}
const handleLeaveRoam = () => {
  sendToUE('c1-leave', {
    item: '全部巷道',
    selectedAll: selectedAll.value,
    hovered: false, // 取消悬浮
    selected: selectedRoam.value,
  })
}
</script>

<template>
  <comLeft />
  <comRight />
  <!-- 安全生产总天数 -->
  <div class="w-[700px] h-[78px] flex items-center absolute top-[247px] left-[1781px]">
    <div class="bg">
      <div class="h-[78px] flex justify-center items-center">
        <span class="text-[28px] font-bold">安全生产总天数：</span>
      </div>
    </div>
    <div v-for="(item, index) in data.day" :key="index" class="w-[74px] h-[78px] flex gap-[12px]">
      <div class="w-[74px] h-[78px] bg-[url('@/assets/img/19.png')] kt-bg-full flex justify-center items-center">
        <span class="text-[48px] font-bold font-[Source-Han-Sans-CN]" :style="{ opacity: item === 0 ? 0.4 : 1 }">{{ item }}</span>
      </div>
    </div>
  </div>

  <!--监控，广播，通讯选择-->
  <div class="absolute top-[147px] left-[767px] w-[282px] h-auto bg-[url('@/assets/img/17-1.png')] kt-bg-full z-3">
    <div v-for="(item, index) in data.left1" key="index" @click="handleSelect(index)">
      <div class="w-[272px] h-[56px] kt-bg-full flex items-center justify-center" :class="[item.active ? item.bg2 : item.bg1]">
        <div class="w-[36px] h-[36px] kt-bg-full" :class="[item.active ? item.icon2 : item.icon1]"></div>
        <div class="w-[174px] text-[30px] ml-[11px]">{{ item.name }}</div>
        <div class="w-[36px] h-[36px] kt-bg-full" :class="[item.active ? item.selected2 : item.selected1]"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  width: 263px;
  height: 78px;
  background: linear-gradient(90deg, rgba(31, 50, 87, 0) 0%, #192c65 27%, #0a1c50 51%, #192c65 73%, rgba(31, 50, 87, 0) 100%);
  border-radius: 0px 0px 0px 0px;
  border: 2px solid;
  border-image: linear-gradient(270deg, rgba(0, 117, 255, 0), rgba(116, 180, 255, 1), rgba(146, 242, 255, 0)) 2 2;
}
</style>
