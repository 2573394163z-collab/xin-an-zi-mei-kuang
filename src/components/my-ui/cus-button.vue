<script setup>
import { ref } from 'vue'
import { watchUEEvents, sendToUE } from '@/ue'
const selectedAll = ref(false)
const selectedRoam = ref('全部巷道')
const data = ref({
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
})

const handleAll = () => {
  selectedAll.value = !selectedAll.value
  if (!selectedAll.value) {
    Object.values(data.value.roam).forEach((item) => (item.active = false))
    sendToUE('c1-click', {
      item: '全部巷道',
      selectedAll: selectedAll.value,
      hovered: false, // 点击时 hovered = 当前选中巷道
      selected: false, // 同步 selected = 当前选中巷道
    })
  }
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
  <!-- 巷道选择 -->
  <div class="absolute bottom-[141px] left-[767px] w-[208px] h-[56px] bg-[url('@/assets/img/20.png')] z-3" @click="handleAll()">
    <span class="text-[24px] h-[56px] flex items-center justify-center">全部巷道</span>
  </div>
  <div v-if="selectedAll" class="absolute bottom-[197px] left-[767px] w-[208px] h-[854px] bg-[url('@/assets/img/17-1.png')]" @mouseleave="handleLeaveRoam()">
    <div class="flex items-center justify-center flex-col">
      <div v-for="(item, index) in data.roam" :key="index">
        <div
          class="w-[202px] h-[50px] kt-bg-full flex justify-center items-center text-[24px]"
          :class="[item.active ? item.bg : '']"
          @click="handleSelectRoam(index)"
          @mouseenter="handleHoverRoam(index)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
