<script setup>
import KtNav from '@/components/kt-ui/kt-nav.vue'
import KtTimer from '@/components/utils-ui/kt-timer.vue'
import autofit from 'autofit.js'
const navState = ref('default') // 当前导航状态
const isRoamActive = ref(false)

// 接收漫游状态变化
const handleRoamChange = (roamState) => {
  isRoamActive.value = roamState
  console.log('漫游状态:', roamState)
}
// 导航变化处理函数
const handleNavChange = (newState) => {
  navState.value = newState
}
const initNavState = () => {
  const activePath = route.matched[route.matched.length - 1]?.path || ''

  const validSubsystems = [
    'environmental-regulation-system', // 环境监控系统
    'production-management-system', // 生产管理系统
    'decision-making-systems', // 经营决策系统
  ]

  const routeName = activePath.split('/').pop() || ''

  if (route.path === '/') {
    navState.value = 'home' // 首页
  } else if (validSubsystems.includes(routeName)) {
    navState.value = routeName // 子系统页面
  }
}

onMounted(() => {
  autofit.init(
    {
      el: '#app-main', // 默认是 "body" 支持所有 css 选择器 (推荐使用 id )
      dw: 4368,
      dh: 1560,
      resize: true, // 默认是 true 关闭后无法自动计算拖动后的大小
    },
    false // 默认是 false 检查autofit.js是否正在运行
  )
})
</script>

<template>
  <div class="text-white" id="app-main">
    <!-- <KtNav /> -->
    <!-- <KtTimer /> -->
    <div class="kt-full absolute top-0 left-0 bg-[url('@/assets/img/bg/bg.png')] kt-bg-full"></div>
    <div class="kt-full absolute top-0 left-0 bg-[url('@/assets/img/bg/bg-1.png')] kt-bg-full"></div>
    <div class="absolute top-[62px] left-[1727px] w-[915px] h-[69px] bg-[url('@/assets/img/bg/title.png')] kt-bg-full"></div>
    <!-- <div class="kt-bg-gradient2 absolute font-[Source-Han-Sans-CN] font-bold text-[54px] kt-x-center top-[56px] tracking-[4px]">
      章源钨业新安子矿业综合管控平台
    </div> -->
    <kt-nav @nav-change="handleNavChange" @roam-change="handleRoamChange"></kt-nav>
    <router-view v-slot="{ Component, route }" v-if="!isRoamActive">
      <keep-alive include="home">
        <component :is="Component" :key="route.name" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style scoped>
#app-main {
  height: 100%;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  z-index: 2;
}
</style>
