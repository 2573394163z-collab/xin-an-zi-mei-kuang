<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'

const data = ref({
  section1: {
    1: {
      考勤率: {
        name: '考勤率',
        value: 94,
        unit: '%',
        bg: 'bg-[url(@/assets/img/27-1.png)]',
      },
      出勤率: {
        name: '出勤率',
        value: 94,
        unit: '%',
        bg: 'bg-[url(@/assets/img/27-2.png)]',
      },
    },
  },
  section2: {
    1: {
      name: '当前班次',
      type: '中班',
    },
    2: {
      值班: {
        name: '值 班',
        1: {
          值班长: {
            manage: '值班长',
            name: '王志峰',
            job: '矿长',
          },
          副值班长: {
            manage: '副值班长',
            name: '邓飞',
            job: '班长',
          },
        },
      },
      带班: {
        name: '带 班',
        1: {
          早班: {
            type: '早班',
            name: '邓飞',
            job: 'xx职位',
            textClass: 'text-[#FFFFFF]',
          },
          中班: {
            type: '中班',
            name: '邓飞',
            job: 'xx职位',
            textClass: 'text-[#62EFD3]',
          },
          晚班: {
            type: '晚班',
            name: '邓飞',
            job: 'xx职位',
            textClass: 'text-[#83DAFF]',
          },
        },
      },
    },
  },
  section3: {
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
      设备异常: {
        name: '设备异常',
        total: 33,
        unit: '个',
        textColor: '#D5C944',
      },
    },
  },
})
</script>
<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col">
    <!-- 班组状态  -->
    <cus-title title="班组状态" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[180px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[650px] flex items-center justify-around">
        <div v-for="(item, index) in data.section1[1]" key="index">
          <div class="w-[224px] h-[112px] kt-bg-full" :class="item.bg">
            <div class="w-[140px] ml-[91px] grid grid-cols-2 grid-rows-2">
              <div class="text-[36px]">{{ item.value }}</div>
              <div class="text-[20px] flex items-center">{{ item.unit }}</div>
              <div class="text-[24px] col-span-2 text-[#62EFD3]">{{ item.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 值带班信息 -->
    <cus-title title="值带班信息" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[508px] w-[700px] kt-bg-full flex flex-col items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/22-1.png')] mt-[20px] flex items-center ml-[20px]">
        <span class="ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section2['1'].name }}</span>
        <sapn class="text-[36px] text-[#83DAFF] ml-[382px]">{{ data.section2['1'].type }}</sapn>
      </div>
      <!-- 值班 -->
      <div class="grid grid-cols-6 grid-rows-2 gap-y-[13px]">
        <div
          class="w-[80px] h-[129px] bg-[url('@/assets/img/28-1.png')] kt-bg-full text-[28px] flex items-center justify-center vertical-text [writing-mode:vertical-lr] row-span-2 col-span-1"
        >
          {{ data.section2[2].值班.name }}
        </div>
        <div
          v-for="(item, key, i) in data.section2[2].值班[1]"
          :key="key"
          class="col-span-5 w-[570px] h-[58px] bg-[url('@/assets/img/28-2.png')] kt-bg-full flex items-center justify-around text-[24px]"
          :class="[i === 0 ? 'row-span-1' : 'col-start-2']"
        >
          <span>{{ item.manage }}</span>
          <span>{{ item.name }}</span>
          <span>{{ item.job }}</span>
        </div>
      </div>
      <div class="w-[672px] h-[12px] bg-[url('@/assets/img/29.png')] kt-bg-full"></div>
      <!-- 带班 -->
      <div class="grid grid-cols-6 grid-rows-3 gap-y-[15px]">
        <div
          class="w-[80px] h-[182px] bg-[url('@/assets/img/30-1.png')] kt-bg-full text-[28px] flex items-center justify-center vertical-text [writing-mode:vertical-lr] row-span-3 col-span-1"
        >
          {{ data.section2[2].带班.name }}
        </div>
        <div
          v-for="(item, key, i) in data.section2[2].带班[1]"
          :key="key"
          class="col-span-5 w-[570px] h-[58px] bg-[url('@/assets/img/30-2.png')] kt-bg-full flex items-center justify-around text-[24px]"
          :class="[i === 0 ? 'row-span-1' : 'col-start-2']"
        >
          <span :class="item.textClass" class="flex-1 flex justify-center items-center">{{ item.type }}</span>
          <span class="flex-2 flex justify-center items-center">{{ item.name }}</span>
          <span class="flex-2 flex justify-center items-center">{{ item.job }}</span>
        </div>
      </div>
    </div>
    <!-- 设备与运输 -->
    <cus-title title="设备与运输" position="right" />
    <div class="bg-[url('@/assets/img/1.png')] h-[367px] w-[700px] kt-bg-full flex flex-wrap items-center justify-around">
      <div class="w-[660px] h-[84px] bg-[url('@/assets/img/22-1.png')] mt-[20px] flex items-center">
        <span class="ml-[13px] text-[28px] tracking-[2px] font-[NotoSansSC]">{{ data.section3['1'].name }}</span>
        <sapn class="text-[48px] text-[#83DAFF] ml-[292px]">{{ data.section3['1'].total }}</sapn>
        <span class="text-[20px] ml-[7px] mt-[22px]">{{ data.section3['1'].unit }}</span>
      </div>
      <div class="bg-[url('@/assets/img/2.png')] kt-bg-full w-[651px] h-[130px] flex justify-around pl-[115px]">
        <div v-for="(item, index) in data.section3['2']" :key="index">
          <div class="flex flex-wrap mt-[23px] w-[100px]">
            <div class="text-[36px]">{{ item.total }}</div>
            <div class="ml-[6px] mt-[16px] text-[20px]">{{ item.unit }}</div>
            <div class="text-[24px] font-[NotoSansSC]" :style="{ color: item.textColor }">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
