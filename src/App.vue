<script setup>
import Layout from '@/views/Layout.vue'
import KtWatermark from '@/components/utils-ui/kt-watermark.vue'
import router from '@/router/index.js'
import { sendToUE, watchUEEvents } from '@/utils/useEventBus'
import Scene from '@/views/Scene.vue'
import { getToken } from '@/axios/token.js' // 导入 token 获取函数

const showPixelStream = ref(false)
// 全局 Token 存储
const globalToken = ref('')

const isTokenReady = ref(false)

/**
 * 获取并存储 Token
 */
 const fetchToken = async () => {
    try {
      const username = window.kt_config.username
      const password = window.kt_config.password
      
      // 调用接口获取 Token
      const token = await getToken({ username, password })
      globalToken.value = token
      
      localStorage.setItem('access_token', token)
      isTokenReady.value = true
    } catch (error) {
      console.error('Token 获取失败:', error)
    }
}

watchUEEvents({
  clickMesh: (data) => {
    console.log('data: ', data)
  },
})
onMounted(async () => {
  await fetchToken()
  // router.push('/') // 页面刷新重定向至首页
})
console.log('app')
</script>

<template>
  <KtWatermark :enable="false" style="pointer-events: none">
    <Layout />
    <!-- <kt-pixel-streaming-player v-if="showPixelStream" /> -->
    <!-- <Scene v-else /> -->
  </KtWatermark>
  <!-- <iframe src="http://127.0.0.1:5501/new3dgs.html" class="absolute bottom-[0px] left-[0px] w-[100%] h-[100%]" frameborder="0"></iframe> -->
</template>

<style scoped>
/* :global(#app) {
  height: 100%;
  width: 100%;
  pointer-events: none;
} */
</style>
