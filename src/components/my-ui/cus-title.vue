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

// 当前显示的下拉框类型
const activeDropdown = ref('') // 'exportTemplate', 'exportData', 'importData', ''

// 当前选择的类型
const selectedType = ref('')

//-------------------------------------------------导出模版--------------------------------------------------
const exportTemplate = async (type = '') => {
  try {
    // 获取文件
    console.log('导出参数', { type })
    let exportType = type || props.title
    if (exportType === '生产进度') {
      exportType = '生产效率'
    }

    const res = await getExportTemplate({ type: exportType })

    // 1️⃣ 创建 blob
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel MIME 类型
    })

    // 2️⃣ 生成下载链接
    const url = window.URL.createObjectURL(blob)

    // 3️⃣ 创建 a 标签
    const link = document.createElement('a')
    link.href = url
    link.download = `${exportType}-导入模板.xlsx` // 文件名
    document.body.appendChild(link)

    // 4️⃣ 触发下载
    link.click()

    // 5️⃣ 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    console.log('导出模板成功 ✅')
    
    // 关闭下拉框
    activeDropdown.value = ''
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
    // 获取文件
    console.log('导出参数', { type })
    let exportType = selectedType.value || props.title
    if (exportType === '生产进度') {
      exportType = '生产效率'
    }

    const res = await getImportData(file, exportType)
    console.log('上传返回', res)

    if (res.data.code === 200) {
      console.log('上传成功 ✅')
      emit('import-success', { type: exportType })
    } else {
      console.error('上传失败 ❌', res.data.message)
    }
  } catch (err) {
    console.error('上传错误 ❌', err)
  } finally {
    event.target.value = '' // 清空 input
    activeDropdown.value = '' // 关闭下拉框
  }
}

// 选择类型并执行相应操作
const selectType = (type) => {
  selectedType.value = type
  
  // 根据当前打开的下拉框执行相应操作
  if (activeDropdown.value === 'exportTemplate') {
    exportTemplate(type)
  } else if (activeDropdown.value === 'exportData') {
    exportData(type)
  } else if (activeDropdown.value === 'importData') {
    triggerFileInput()
  }
  
  // 关闭下拉框
  activeDropdown.value = ''
}

// 切换下拉框显示状态
const toggleDropdown = (dropdownType) => {
  if (activeDropdown.value === dropdownType) {
    activeDropdown.value = ''
  } else {
    activeDropdown.value = dropdownType
  }
}

//------------------------------------------------导出数据--------------------------------------------------
const exportData = async (type = '') => {
  try {
    console.log('导出参数', { type })
    let exportType = type || props.title
    if (exportType === '生产进度') {
      exportType = '生产效率'
    }
    const res = await getExportData({ type: exportType })

    // 1️⃣ 创建 Blob（不要写错 mime）
    const blob = new Blob([res.data], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })

    // 2️⃣ 创建下载链接
    const url = window.URL.createObjectURL(blob)

    // 3️⃣ 创建 a 标签触发下载
    const link = document.createElement('a')
    link.href = url
    link.download = `${exportType}-数据.xlsx`
    document.body.appendChild(link)
    link.click()

    // 4️⃣ 清理
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    // 关闭下拉框
    activeDropdown.value = ''
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
            @click="title === '生产进度' ? toggleDropdown('exportTemplate') : exportTemplate()"
          />
          <div
            v-if="etHover"
            class="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[96px] h-[60px] bg-[url('@/assets/img/export-template1.png')] bg-contain bg-no-repeat"
          />
          <!-- 导出模版下拉框 -->
          <div
            v-show="activeDropdown === 'exportTemplate' && title === '生产进度'"
            class="absolute top-[42px] left-1/2 -translate-x-1/2 w-[220px] h-[118.63px] kt-bg-full bg-[url('@/assets/img/dropDownBg.png')] flex flex-col justify-center items-center text-[24px] z-10 pt-[20px] pointer-events-auto"
          >
            <div class="w-full h-[46px] kt-bg-full kt-flex cursor-pointer hover:bg-[url('@/assets/img/dropDownSelected.png')]" @click="selectType('采掘进尺记录')">采掘进尺记录</div>
            <div class="w-full h-[46px]  kt-bg-full kt-flex cursor-pointer hover:bg-[url('@/assets/img/dropDownSelected.png')]" @click="selectType('生产效率')">生产效率</div>
          </div>
        </div>

        <!-- 导出数据 -->
        <div class="relative">
          <img
            src="@/assets/img/export-data.png"
            class="w-[42px] h-[42px]"
            @mouseenter="edHover = true"
            @mouseleave="edHover = false"
            @click="title === '生产进度' ? toggleDropdown('exportData') : exportData()"
          />
          <div
            v-if="edHover"
            class="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[96px] h-[60px] bg-[url('@/assets/img/export-data1.png')] bg-contain bg-no-repeat"
          />
          <!-- 导出数据下拉框 -->
          <div
            v-show="activeDropdown === 'exportData' && title === '生产进度'"
               class="absolute top-[42px] left-1/2 -translate-x-1/2 w-[220px] h-[118.63px] kt-bg-full bg-[url('@/assets/img/dropDownBg.png')] flex flex-col justify-center items-center text-[24px] z-10 pt-[20px] pointer-events-auto"
          >
            <div class="w-full h-[46px] kt-bg-full kt-flex cursor-pointer hover:bg-[url('@/assets/img/dropDownSelected.png')]" @click="selectType('采掘进尺记录')">采掘进尺记录</div>
            <div class="w-full h-[46px]  kt-bg-full kt-flex cursor-pointer hover:bg-[url('@/assets/img/dropDownSelected.png')]" @click="selectType('生产效率')">生产效率</div>
          </div>
        </div>
        
        <!-- 导入数据 -->
        <div class="relative">
          <img
            src="@/assets/img/import-data.png"
            class="w-[42px] h-[42px]"
            @mouseenter="idHover = true"
            @mouseleave="idHover = false"
            @click="title === '生产进度' ? toggleDropdown('importData') : triggerFileInput()"
          />
          <input type="file" ref="fileInput" accept=".xlsx,.xls" class="hidden" @change="importData" />
          <div
            v-if="idHover"
            class="absolute top-[-60px] left-1/2 -translate-x-1/2 w-[96px] h-[60px] bg-[url('@/assets/img/import-data1.png')] bg-contain bg-no-repeat"
          />
          <!-- 导入数据下拉框 -->
          <div
            v-show="activeDropdown === 'importData' && title === '生产进度'"
              class="absolute top-[42px] left-1/2 -translate-x-1/2 w-[220px] h-[118.63px] kt-bg-full bg-[url('@/assets/img/dropDownBg.png')] flex flex-col justify-center items-center text-[24px] z-10 pt-[20px] pointer-events-auto"
          >
            <div class="w-full h-[46px] kt-bg-full kt-flex cursor-pointer hover:bg-[url('@/assets/img/dropDownSelected.png')]" @click="selectType('采掘进尺记录')">采掘进尺记录</div>
            <div class="w-full h-[46px]  kt-bg-full kt-flex cursor-pointer hover:bg-[url('@/assets/img/dropDownSelected.png')]" @click="selectType('生产效率')">生产效率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
