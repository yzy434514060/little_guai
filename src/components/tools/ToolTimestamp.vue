<!--
  工具名称: 时间戳转换
  功能描述: 时间戳与日期时间互转
-->
<script setup>
import { ref, computed } from 'vue'
import CopyButton from '@/components/common/CopyButton.vue'

const timestamp = ref(Date.now())
const dateTime = ref(new Date().toISOString().slice(0, 16))
const timestampType = ref('ms') // 'ms' | 's'

// 当前时间戳
const currentTimestamp = computed(() => {
  return timestampType.value === 'ms' ? Date.now() : Math.floor(Date.now() / 1000)
})

// 时间戳转日期
const timestampToDate = computed(() => {
  try {
    const ts = timestampType.value === 'ms' ? Number(timestamp.value) : Number(timestamp.value) * 1000
    const date = new Date(ts)
    return {
      iso: date.toISOString(),
      local: date.toLocaleString('zh-CN'),
      date: date.toLocaleDateString('zh-CN'),
      time: date.toLocaleTimeString('zh-CN')
    }
  } catch {
    return null
  }
})

// 日期转时间戳
const dateToTimestamp = computed(() => {
  try {
    const ts = new Date(dateTime.value).getTime()
    return {
      ms: ts,
      s: Math.floor(ts / 1000)
    }
  } catch {
    return null
  }
})

// 使用当前时间
const useNow = () => {
  timestamp.value = currentTimestamp.value
  dateTime.value = new Date().toISOString().slice(0, 16)
}
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">时间戳转换</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">时间戳与日期时间互转</p>

      <div class="space-y-6">
        <!-- 当前时间 -->
        <div class="p-4 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-900/20 dark:to-blue-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">当前时间戳</div>
          <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ currentTimestamp }}</div>
          <button @click="useNow" class="mt-2 text-sm text-primary-600 dark:text-primary-400 hover:underline">使用当前时间</button>
        </div>

        <!-- 时间戳转日期 -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">时间戳 → 日期时间</h3>

          <div class="flex gap-3">
            <input
              v-model="timestamp"
              type="number"
              placeholder="输入时间戳"
              class="tool-input flex-1"
            >
            <select v-model="timestampType" class="px-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-300 dark:border-slate-600 rounded-lg">
              <option value="ms">毫秒</option>
              <option value="s">秒</option>
            </select>
          </div>

          <div v-if="timestampToDate" class="space-y-2">
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400">ISO 8601</div>
                <div class="font-mono">{{ timestampToDate.iso }}</div>
              </div>
              <CopyButton :text="timestampToDate.iso" />
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400">本地时间</div>
                <div class="font-mono">{{ timestampToDate.local }}</div>
              </div>
              <CopyButton :text="timestampToDate.local" />
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <div class="text-xs text-gray-500 dark:text-gray-400">日期</div>
                <div class="font-mono">{{ timestampToDate.date }}</div>
              </div>
              <div class="p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
                <div class="text-xs text-gray-500 dark:text-gray-400">时间</div>
                <div class="font-mono">{{ timestampToDate.time }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 日期转时间戳 -->
        <div class="space-y-4">
          <h3 class="font-semibold text-lg">日期时间 → 时间戳</h3>

          <input
            v-model="dateTime"
            type="datetime-local"
            class="tool-input"
          >

          <div v-if="dateToTimestamp" class="grid grid-cols-2 gap-3">
            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400">毫秒</div>
                <div class="font-mono">{{ dateToTimestamp.ms }}</div>
              </div>
              <CopyButton :text="String(dateToTimestamp.ms)" />
            </div>

            <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
              <div>
                <div class="text-xs text-gray-500 dark:text-gray-400">秒</div>
                <div class="font-mono">{{ dateToTimestamp.s }}</div>
              </div>
              <CopyButton :text="String(dateToTimestamp.s)" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
