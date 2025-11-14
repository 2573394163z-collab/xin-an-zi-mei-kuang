<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  tableData: {
    type: Array,
    required: true,
  },
  tableTitle: {
    type: Array,
    required: true,
  },
  tableKeys: {
    type: Array,
    required: true,
  },
  tableWidth: {
    type: Array,
    required: true,
  },
  getStatusClass: {
    type: Function,
    default: (key, status) => {
      if (key === 'key4') {
        // return status === '正常' ? 'text-[#32FE6B]' : 'text-[#FE323B]';
      }
    },
  },
  height: {
    type: String,
    default: '284px',
  },
})
</script>

<template></template>

<style scoped></style>
