<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  title: {
    type: String,
  },
  position: {
    type: String,
    default: 'right',
  },
})
</script>

<template>
  <div
    :class="[
      position === 'right' ? `bg-[url('@/assets/img/cus-title-2.png')] right-[0px]` : `bg-[url('@/assets/img/cus-title-1.png')] left-[0px]`,
      'w-[700px] h-[60px] mt-[20px]',
    ]"
  >
    <div class="w-[700px] h-[60px] kt-bg-full text-[30px] flex items-center text-wrap text-left pl-[67px] tracking-[2px] font-[NotoSansSC] font-bold">
      {{ title }}
    </div>
  </div>
</template>

<style scoped></style>
