<script setup>
import comLeft from './comps/comLeft.vue'
import comRight from './comps/comRight.vue'
import { watchUEEvents, sendToUE } from '@/ue'
import cusButton from '@/components/my-ui/cus-button.vue'

const data = ref({
  left1: {
    风速感应器: {
      name: '风速感应器',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left2/1-1.png)]',
      icon2: 'bg-[url(@/assets/img/left2/1-2.png)]',
    },
    识别定位器: {
      name: '识别定位器',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left2/2-1.png)]',
      icon2: 'bg-[url(@/assets/img/left2/2-2.png)]',
    },
    一氧化碳传感器: {
      name: '一氧化碳传感器',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left2/3-1.png)]',
      icon2: 'bg-[url(@/assets/img/left2/3-2.png)]',
    },
    压差传感器: {
      name: '压差传感器',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left2/4-1.png)]',
      icon2: 'bg-[url(@/assets/img/left2/4-2.png)]',
    },
    扬尘噪声检测: {
      name: '扬尘噪声检测',
      active: false,
      bg1: 'bg-[url(@/assets/img/left1/1.png)]',
      bg2: 'bg-[url(@/assets/img/left1/1-c.png)]',
      selected1: 'bg-[url(@/assets/img/left1/2.png)]',
      selected2: 'bg-[url(@/assets/img/left1/2-c.png)]',
      icon1: 'bg-[url(@/assets/img/left2/5-1.png)]',
      icon2: 'bg-[url(@/assets/img/left2/5-2.png)]',
    },
  },
})

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
</script>

<template>
  <comLeft />
  <comRight />
  <div class="absolute top-[147px] left-[767px] w-[282px] h-auto bg-[url('@/assets/img/17-1.png')] kt-bg-full z-3">
    <div v-for="(item, index) in data.left1" key="index" @click="handleSelect(index)">
      <div class="w-[272px] h-[56px] kt-bg-full flex items-center justify-center" :class="[item.active ? item.bg2 : item.bg1]">
        <div class="w-[36px] h-[36px] kt-bg-full" :class="[item.active ? item.icon2 : item.icon1]"></div>
        <div class="w-[174px] text-[24px] ml-[11px]">{{ item.name }}</div>
        <div class="w-[36px] h-[36px] kt-bg-full" :class="[item.active ? item.selected2 : item.selected1]"></div>
      </div>
    </div>
  </div>
  <!-- 巷道选择 -->
  <cus-button />
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
