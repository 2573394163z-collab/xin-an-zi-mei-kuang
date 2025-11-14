<script setup>
import cusTitle from '@/components/my-ui/cus-title.vue'
import ktTable from '@/components/my-ui/kt-table.vue'
import cusPjTable from '@/components/my-ui/cus-pj-table.vue'

const data = ref({
  section1: {
    1: {
      在岗人数: {
        name: '在岗人数',
        value: 698,
        img: 'bg-[url(@/assets/img/8-1.png)]',
        textColor: 'text-[#62EFD3]',
      },
      请假人数: {
        name: '请假人数',
        value: 698,
        img: 'bg-[url(@/assets/img/8-2.png)]',
        textColor: 'text-[#62EFD3]',
      },
      离职人数: {
        name: '离职人数',
        value: 6,
        img: 'bg-[url(@/assets/img/8-3.png)]',
        textColor: 'text-[#FFB348]',
      },
    },
    2: {
      中段1: {
        name: '中段1',
        value: 120,
      },
      中段2: {
        name: '中段2',
        value: 120,
      },
      中段3: {
        name: '中段3',
        value: 120,
      },
      中段4: {
        name: '中段4',
        value: 120,
      },
      中段5: {
        name: '中段5',
        value: 120,
      },
      中段6: {
        name: '中段6',
        value: 120,
      },
    },
  },
  section2: {
    columns: [
      {
        label: '序号',
        prop: 'k1',
        dir: 'center',
        width: 1,
      },
      {
        label: '告警详情',
        prop: 'k2',
        dir: 'center',
        width: 1,
      },
      {
        label: '告警地点',
        prop: 'k3',
        dir: 'center',
        width: 3,
      },
      {
        label: '告警时间',
        prop: 'k4',
        dir: 'center',
        width: 1,
      },
      {
        label: '处置状态',
        prop: 'k5',
        dir: 'center',
        width: 1,
      },
    ],
    data: [
      {
        k1: '1',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
      {
        k1: '2',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
      {
        k1: '3',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
      {
        k1: '4',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
      {
        k1: '5',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
      {
        k1: '6',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
      {
        k1: '7',
        k2: 'XXX',
        k3: 'XXX',
        k4: 'XXXXXX',
        k5: 'XXX',
      },
    ],
  },
})
</script>
<template>
  <div class="w-[700px] top-[117px] right-[44px] absolute flex flex-col">
    <!--人员在岗-->
    <cus-title title="人员在岗" />
    <div class="bg-[url('@/assets/img/1.png')] h-[331px] w-[700px] kt-bg-full">
      <div class="flex justify-around">
        <div v-for="(item, index) in data.section1[1]" key="index" class="mt-[20px]">
          <div :class="['w-[183px] h-[112px] kt-bg-full ', item.img]">
            <span class="pl-[77px] pt-[9px] text-[36px]">{{ item.value }}</span>
            <span class="pl-[8px] pt-[14px] text-[20px]">人</span>
            <span class="pl-[77px] pt-[61px] text-[24px]" :class="item.textColor">{{ item.name }}</span>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-3 grid-rows-2 gap-x-[70px] ml-[38px]">
        <div v-for="(item, index) in data.section1[2]" key="index" class="mt-[20px]">
          <div class="w-[162px] h-[64px] kt-bg-full bg-[url(@/assets/img/9.png)]">
            <div class="pl-[26px] text-[24px]">{{ item.name }}</div>
            <div class="pl-[26px] -mt-[10px] text-[28px] font-bold flex">
              {{ item.value }}

              <span class="text-[20px] pt-[6px] font-normal">个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <cus-title title="告警列表" />
    <div class="bg-[url('@/assets/img/1.png')] h-[312px] w-[700px] kt-bg-full">
      <div class="ml-[21px] mt-[14px]"></div>
      <cus-pj-table :columns="data.section2.columns" :data="data.section2.data" gap="4px"></cus-pj-table>
    </div>
    <cus-title title="视频监控" />
    <div class="bg-[url('@/assets/img/1.png')] h-[492px] w-[700px] kt-bg-full">
      <div class="bg-[url('@/assets/img/2.png')] h-[33px] w-[192px] kt-bg-full ml-[33px] text-[24px] pl-[33px]">XXX巷道口</div>
    </div>
  </div>
</template>

<style scoped></style>
