<!--
  工作倒计时组件
  功能：显示距离下班的剩余时间，支持自定义工作时间
-->
<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// 默认工作时间段
const DEFAULT_WORK_PERIODS = [
  { start: '09:00', end: '12:00' },
  { start: '13:30', end: '18:00' }
]

// 从 localStorage 读取或使用默认值
const workPeriods = ref(
  JSON.parse(localStorage.getItem('work-periods')) || DEFAULT_WORK_PERIODS
)

const showSettings = ref(false)
const currentTime = ref(new Date())
const settingsRef = ref(null)

// 定时更新当前时间
let timer = null
onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

// 点击外部关闭设置面板
const handleClickOutside = (event) => {
  if (settingsRef.value && !settingsRef.value.contains(event.target)) {
    showSettings.value = false
  }
}

watch(showSettings, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

// 将时间字符串转换为秒数
const timeToSeconds = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number)
  return hours * 3600 + minutes * 60
}

// 获取当前秒数
const getCurrentSeconds = (date) => {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()
}

// 计算剩余工作时间
const countdown = computed(() => {
  const currentSeconds = getCurrentSeconds(currentTime.value)
  const periods = workPeriods.value.map(p => ({
    start: timeToSeconds(p.start),
    end: timeToSeconds(p.end)
  }))

  let remainingSeconds = 0
  let status = 'after_work'

  // 检查当前处于哪个时间段
  for (let i = 0; i < periods.length; i++) {
    const period = periods[i]

    if (currentSeconds < period.start) {
      // 还没到这个时间段，计算所有剩余工作时间
      for (let j = i; j < periods.length; j++) {
        remainingSeconds += periods[j].end - periods[j].start
      }
      status = i === 0 ? 'before_work' : 'lunch_break'
      break
    } else if (currentSeconds < period.end) {
      // 在这个时间段内工作
      remainingSeconds = period.end - currentSeconds
      // 加上后续时间段
      for (let j = i + 1; j < periods.length; j++) {
        remainingSeconds += periods[j].end - periods[j].start
      }
      status = 'working'
      break
    }
  }

  return { remainingSeconds, status }
})

// 格式化时间显示
const formattedTime = computed(() => {
  const seconds = Math.max(0, Math.floor(countdown.value.remainingSeconds))
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
})

// 状态文本和图标
const statusInfo = computed(() => {
  switch (countdown.value.status) {
    case 'before_work': return { icon: '☕', text: '未上班' }
    case 'working': return { icon: '💼', text: '工作中' }
    case 'lunch_break': return { icon: '🍜', text: '午休中' }
    case 'after_work': return { icon: '🎉', text: '已下班' }
    default: return { icon: '', text: '' }
  }
})

// 保存设置
const saveSettings = () => {
  localStorage.setItem('work-periods', JSON.stringify(workPeriods.value))
  showSettings.value = false
}

// 重置为默认值
const resetToDefault = () => {
  workPeriods.value = [...DEFAULT_WORK_PERIODS]
  localStorage.setItem('work-periods', JSON.stringify(workPeriods.value))
}
</script>

<template>
  <div class="relative">
    <!-- 倒计时显示 -->
    <button
      @click="showSettings = !showSettings"
      class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors text-sm"
      :title="statusInfo.text"
    >
      <span>{{ statusInfo.icon }}</span>
      <span class="font-mono font-semibold">
        {{ countdown.status === 'after_work' ? '下班啦' : formattedTime }}
      </span>
    </button>

    <!-- 设置面板 -->
    <div
      v-if="showSettings"
      ref="settingsRef"
      class="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-4 z-50"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-semibold">工作时间设置</h3>
        <button
          @click="showSettings = false"
          class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="space-y-4">
        <!-- 上午时间段 -->
        <div>
          <label class="block text-sm font-medium mb-2">上午</label>
          <div class="flex items-center gap-2">
            <input
              v-model="workPeriods[0].start"
              type="time"
              class="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-sm"
            >
            <span class="text-gray-500">-</span>
            <input
              v-model="workPeriods[0].end"
              type="time"
              class="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-sm"
            >
          </div>
        </div>

        <!-- 下午时间段 -->
        <div>
          <label class="block text-sm font-medium mb-2">下午</label>
          <div class="flex items-center gap-2">
            <input
              v-model="workPeriods[1].start"
              type="time"
              class="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-sm"
            >
            <span class="text-gray-500">-</span>
            <input
              v-model="workPeriods[1].end"
              type="time"
              class="flex-1 px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg text-sm"
            >
          </div>
        </div>

        <!-- 按钮 -->
        <div class="flex gap-2 pt-2">
          <button
            @click="saveSettings"
            class="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            保存
          </button>
          <button
            @click="resetToDefault"
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
          >
            重置
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
