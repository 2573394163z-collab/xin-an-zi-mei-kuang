<!-- kt-nav.vue -->
<script setup>
import { ref, defineEmits, defineProps } from 'vue'
import { sliceArr } from '@/utils/num'
import { watchUEEvents, sendToUE } from '@/ue'
import { useRoute, useRouter } from 'vue-router'
import {useStore} from '@/stores/index'

const route = useRoute()
const router = useRouter()
const routes = ref(router.getRoutes())
const selectedRoam = ref(false)
const selectedFactory = ref(true)
const selectedMine = ref(false)
const store = useStore()
// const selected = ref({
//   安全管控厂区: {
//     factory: false,
//     mine: false,
//   },
//   安全管控矿下: {
//     factory: false,
//     mine: false,
//   },
//   环境监督: {
//     factory: false,
//     mine: false,
//   },
//   生产管理: {
//     factory: false,
//     mine: false,
//   },
//   经营决策: {
//     factory: false,
//     mine: false,
//   },
// })
const currentRouteIndex = ref(0)
const data = ref({
  roam: {
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
    '195巷道': {
      name: '195巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '295巷道': {
      name: '295巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '145巷道': {
      name: '145巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
    '427巷道': {
      name: '427巷道',
      active: false,
      bg: 'bg-[url(@/assets/img/17-2.png)]',
    },
  },
})

const handleSelectRoam = (index) => {
  Object.values(data.value.roam).forEach((item) => (item.active = false))
  data.value.roam[index].active = true
  sendToUE(`c1-btn1-type`, { item: '漫游', selectedRoam: selectedRoam.value, selected: data.value.roam[index].name })
}

// 跳转厂区场景并发送ue消息
const handleFactoryClick = () => {
  selectedFactory.value = true
  selectedMine.value = false
  selectedRoam.value = false // 厂区场景强制关闭漫游
  store.selectScene = '厂区场景'

  emit('roam-change', false)
  
  sendToUE(`c1-btn2-type`, { item: '厂区场景', selectedFactory: selectedFactory.value, selectedMine: selectedMine.value })
}
// 跳转矿下场景并发送ue消息
const handleMineClick = () => {
  selectedFactory.value = false
  selectedMine.value = true
  selectedRoam.value = false // 初始井下不开启漫游
  store.selectScene = '井下场景'
  
  sendToUE(`c1-btn3-type`, { item: '井下场景', selectedFactory: selectedFactory.value, selectedMine: selectedMine.value })
}

const handleRoamClick = () => {
  selectedRoam.value = !selectedRoam.value
  // 发射状态改变事件，用于 Layout 隐藏/显示面板
  emit('roam-change', selectedRoam.value)
  
  sendToUE(`c1-btn1-type`, { 
    item: '漫游', 
    selectedRoam: selectedRoam.value,
    selected: selectedRoam.value 
  })
  
  if (!selectedRoam.value) {
    Object.values(data.value.roam).forEach((item) => (item.active = false))
  }
}
watchUEEvents({
  'c1-btn1-type': (data) => {
    if (data.item === '漫游') {
      selectedRoam.value = data.selected
    }
  },
})

let infoArr = ref([])

let unitLen = 4

const props = defineProps({
  permissions: {
    type: Array,
    default: () => [],
  },
})

const getPermissions = () => {
  try {
    const storedPermissions = localStorage.getItem('permissions')
    // 如果存在且不为空，尝试解析
    if (storedPermissions) {
      return JSON.parse(storedPermissions)
    }
    // 默认返回空数组
    return []
  } catch (e) {
    console.error('解析 permissions 失败，已重置为空数组:', e)
    // 如果解析失败（比如存的是 "/home"），为了安全起见，清除该脏数据并返回空数组
    localStorage.removeItem('permissions') 
    return []
  }
}

const permissions = ref(getPermissions())

// 过滤路由，只显示有权限的路由
const filterRoutesByPermissions = (routes) => {
  // 如果没有权限限制，显示所有路由
  if (!permissions.value || permissions.value.length === 0) {
    return routes
  }

  // 根据权限过滤路由
  // 这里假设路由的 name 或 meta 中包含权限标识
  return routes.filter((r) => {
    // 如果路由没有设置权限要求，则默认显示
    if (!r.meta || !r.meta.permission) {
      return true
    }
    // 检查用户是否有该路由的权限
    return permissions.value.includes(r.meta.permission)
  })
}

const events = {
  'ue-change-route': (data) => {
    console.log('🚀 ~ data:', data)
    router.push(data).catch((err) => {
      console.error('路由跳转失败:', err)
    })
  },
}
// watchUEEvents(events)

const emit = defineEmits(['nav-change', 'roam-change'])
const navEvent = (index, cRoute, n) => {
  if (cRoute.meta?.title === '经营决策') {
    console.log('🚫 点击了经营决策，不执行跳转或UE消息')
    return
  }
  if (route.path === cRoute.path) return
  if (!cRoute.path) {
    console.error('无效的路由路径:', cRoute)
    return
  }
  console.log('cRoute:', cRoute)
  emit('nav-change', cRoute.name || cRoute.path)
  console.log('当前路由-------:', cRoute.path)
  router.push(cRoute.path).catch((err) => {
    console.error('路由跳转失败:', err)
  })
  currentRouteIndex.value = index * unitLen + n
  sendToUE('c1-type1', {
    text: cRoute.meta.title,
    index: currentRouteIndex.value,
  })
}

const carouselRef = ref(null)
onMounted(() => {
  // 过滤路由后再进行分片
  const filteredRoutes = filterRoutesByPermissions(routes.value.slice(1))
  infoArr.value = sliceArr(filteredRoutes, unitLen)
})

// watch(
//   () => route.path,
//   (newPath) => {
//     if (newPath === '/safety-control-factory' || newPath === '/environmental-regulation') {
//       selectedFactory.value = true
//       selectedMine.value = false
//     } else if (newPath === '/safety-control-mine') {
//       selectedFactory.value = false
//       selectedMine.value = true
//     }
//   },
//   { immediate: true }
// )

watchEffect(() => {
  const path = route.path
  const index = routes.value.findIndex((r) => r.path === path)
  currentRouteIndex.value = index <= 1 ? 0 : index - 1
})
</script>

<template>
  <nav class="w-full h-[109px] absolute bottom-[0px] z-[2] flex items-center justify-center gap-[40px] pointer-events-auto">
    <div class="w-[1350px] h-full">
      <el-carousel ref="carouselRef" height="67px" :interval="3000" :autoplay="false" trigger="click" arrow="never" indicator-position="outside">
        <el-carousel-item v-for="(item, index) in infoArr" :key="index">
          <div class="flex w-[1400px]">
            <div
              v-for="(route, _index) in item"
              @click="navEvent(index, route, _index)"
              :key="_index"
              class="pointer flex h-[118px] kt-bg-full cus-bg-size2 kt-flex items-center cursor-pointer pr-[40px]"
            >
              <div
                :style="{
                  backgroundImage: `url(${currentRouteIndex === index * unitLen + _index ? route.meta.iconC : route.meta.icon})`,
                }"
                :class="[route.meta && currentRouteIndex === index * unitLen + _index ? route.meta.iconCClass : route.meta.iconClass]"
                class="flex items-center justify-center"
                @dragstart.prevent
                alt=""
              >
                <div class="flex flex-col items-center font-SHSC ml-[141px] whitespace-nowrap text-nowrap mb-[35px]">
                  <div class="font-bold text-[28px]">{{ route.meta && route.meta.title }}</div>
                </div>
              </div>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </nav>
  <div class="absolute bottom-[55px] left-[1170px] w-[265px] h-[58px] bg-[url('@/assets/img/17.png')] z-3 pointer-events-auto" @click="handleRoamClick()" v-if="selectedMine">
    <span class="text-[28px] pl-[49px] pt-[5px]">场景漫游</span>
  </div>
  <div v-if="selectedRoam && selectedMine" class="absolute bottom-[113px] left-[1220px] w-[208px] h-[404px] bg-[url('@/assets/img/17-1.png')] pointer-events-auto z-10">
    <div class="flex items-center justify-center flex-col">
      <div v-for="(item, index) in data.roam" :key="index">
        <div class="w-[202px] h-[50px] flex justify-center items-center text-[24px]" :class="[item.active ? item.bg : '']" @click="handleSelectRoam(index)">
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
  <div class="absolute bottom-[55px] left-[2934px] w-[265px] h-[58px] bg-[url('@/assets/img/18-1.png')] z-3 pointer-events-auto" v-if="selectedFactory">
    <span class="text-[28px] pl-[106px] pt-[5px]" @click="handleMineClick()">井下场景</span>
  </div>
  <!-- <div class="absolute bottom-[158px] left-[2934px] w-[265px] h-[58px] bg-[url('@/assets/img/18-2.png')] z-3" v-if="selectedFactory">
    <span class="text-[28px] pl-[106px] pt-[5px]" @click="handleFactoryClick()">厂区场景</span>
  </div> -->
  <div class="absolute bottom-[60px] left-[2934px] w-[265px] h-[58px] bg-[url('@/assets/img/18-2.png')] z-3 pointer-events-auto" v-if="selectedMine">
    <span class="text-[28px] pl-[106px] pt-[5px]" @click="handleFactoryClick()">厂区场景</span>
  </div>
  <!-- <iframe
    src="http://127.0.0.1:5501/new3dgs.html"
    class="absolute bottom-[0px] left-[0px] w-[100%] h-[100%] pointer-events-auto"
    frameborder="0"
    v-if="selectedFactory"
  ></iframe> -->
  <iframe
    src="/new3dgs/new3dgs.html"
    class="absolute bottom-[0px] left-[0px] w-[100%] h-[100%] pointer-events-auto"
    frameborder="0"
    v-if="selectedFactory"
  ></iframe>
  <kt-pixel-streaming-player v-if="selectedMine" />
</template>

<style lang="less">
nav {
  .el-carousel__indicators,
  .el-carousel__indicators--horizontal,
  .el-carousel__indicators--outside {
    display: none !important;
  }
}
</style>
