<!--
  M3U8 视频测试工具
  功能：测试 M3U8 多清晰度视频播放
-->
<script setup>
import { ref, onMounted } from 'vue'

const iframeLoaded = ref(false)

onMounted(() => {
  // iframe 加载完成后设置标志
  setTimeout(() => {
    iframeLoaded.value = true
  }, 500)
})
</script>

<template>
  <div class="tool-container">
    <div class="tool-header">
      <h1 class="text-3xl font-bold mb-2">M3U8 视频测试</h1>
      <p class="text-gray-600 dark:text-gray-400 mb-4">
        测试 M3U8 多清晰度视频播放，支持自动解析和手动模式
      </p>
    </div>

    <div class="iframe-container">
      <div v-if="!iframeLoaded" class="loading-overlay">
        <div class="loading-spinner"></div>
        <p class="mt-4 text-gray-600">加载中...</p>
      </div>
      <iframe
        src="/m3u8-tester.html"
        class="w-full h-full border-0"
        @load="iframeLoaded = true"
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.tool-container {
  display: flex;
  flex-direction: column;
}

.tool-header {
  flex-shrink: 0;
}

.iframe-container {
  flex: 1;
  position: relative;
  min-height: 800px;
  overflow: visible;
}

iframe {
  min-height: 800px;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  z-index: 10;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f4f6;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
