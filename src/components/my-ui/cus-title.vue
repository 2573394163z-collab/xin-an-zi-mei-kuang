<script setup>
import { getExportTemplate, getImportData, getExportData } from '@/axios/handData'
import { defineEmits, defineProps } from 'vue'

const fileInput = ref(null)
const emit = defineEmits(['import-success'])
const props = defineProps({
  title: {
    type: String,
  },
  position: {
    type: String,
    default: 'right',
  },
  download: {
    type: Boolean,
    default: false,
  },
})
const type = props.title // 七选一：设备安全监测 / 监控与告警等
const etHover = ref(false)
const edHover = ref(false)
const idHover = ref(false)
//-------------------------------------------------导出模版--------------------------------------------------
const exportTemplate = async () => {
  try {
    // 获取文件
    console.log('导出参数', { type })
    const res = await getExportTemplate({ type })

    // 1️⃣ 创建 blob
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel MIME 类型
    })

    // 2️⃣ 生成下载链接
    const url = window.URL.createObjectURL(blob)

    // 3️⃣ 创建 a 标签
    const link = document.createElement('a')
    link.href = url
    link.download = `${type}-导入模板.xlsx` // 文件名
    document.body.appendChild(link)

    // 4️⃣ 触发下载
    link.click()

    // 5️⃣ 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    console.log('导出模板成功 ✅')
  } catch (error) {
    console.error('导出模板失败 ❌', error)
  }
}

//------------------------------------------------导入数据--------------------------------------------------
// 点击图片触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 文件上传事件
const importData = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const res = await getImportData(file, type)
    console.log('上传返回', res)

    if (res.data.code === 200) {
      console.log('上传成功 ✅')
      emit('import-success', { type })
    } else {
      console.error('上传失败 ❌', res.data.message)
    }
  } catch (err) {
    console.error('上传错误 ❌', err)
  } finally {
    event.target.value = '' // 清空 input
  }
}

//------------------------------------------------导出数据--------------------------------------------------
const exportData = async () => {
  try {
    const res = await getExportData({ type })

    // 1️⃣ 创建 Blob（不要写错 mime）
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // 2️⃣ 创建下载链接
    const url = window.URL.createObjectURL(blob)

    // 3️⃣ 创建 a 标签触发下载
    const link = document.createElement('a')
    link.href = url
    link.download = `${type}-数据.xlsx`
    document.body.appendChild(link)
    link.click()

    // 4️⃣ 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('导出数据失败', err)
  }
}
</script>

<template>
  <div
    :class="[
      position === 'right' ? `bg-[url('@/assets/img/cus-title-2.png')] right-[0px]` : `bg-[url('@/assets/img/cus-title-1.png')] left-[0px]`,
      'w-[700px] h-[60px] mt-[20px]',
    ]"
  >
    <div
      class="w-[700px] h-[60px] kt-bg-full text-[30px] flex items-center justify-between text-wrap text-left pl-[67px] tracking-[2px] font-[NotoSansSC] font-bold pr-[75px]"
    >
      {{ title }}
      <div v-if="download" class="flex flex-nowrap w-[166px] h-[42px] justify-between pointer-events-auto">
        <!-- 导出模版 -->
        <div class="relative">
          <img
            src="@/assets/img/export-template.png"
            class="w-[42px] h-[42px]"
            @mouseenter="etHover = true"
            @mouseleave="etHover = false"
            @click="exportTemplate()"
          />
          <div
            v-if="etHover"
            class="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[96px] h-[60px] bg-[url('@/assets/img/export-template1.png')] bg-contain bg-no-repeat"
          />
        </div>

        <!-- 导出数据 -->
        <div class="relative">
          <img src="@/assets/img/export-data.png" class="w-[42px] h-[42px]" @mouseenter="edHover = true" @mouseleave="edHover = false" @click="exportData" />
          <div
            v-if="edHover"
            class="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[96px] h-[60px] bg-[url('@/assets/img/export-data1.png')] bg-contain bg-no-repeat"
          />
        </div>
        <!-- 导入数据 -->
        <div class="relative">
          <img
            src="@/assets/img/import-data.png"
            class="w-[42px] h-[42px]"
            @mouseenter="idHover = true"
            @mouseleave="idHover = false"
            @click="triggerFileInput"
          />
          <input type="file" ref="fileInput" accept=".xlsx,.xls" class="hidden" @change="importData" />
          <div
            v-if="idHover"
            class="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[96px] h-[60px] bg-[url('@/assets/img/import-data1.png')] bg-contain bg-no-repeat"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
