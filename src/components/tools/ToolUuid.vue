<!--
  工具名称: UUID 生成
  功能描述: 生成 UUID/GUID
-->
<script setup>
import { ref } from 'vue'
import CopyButton from '@/components/common/CopyButton.vue'

const uuids = ref([])
const count = ref(1)
const uppercase = ref(false)
const withHyphens = ref(true)

// 生成 UUID v4
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 生成多个 UUID
const generate = () => {
  uuids.value = []
  for (let i = 0; i < count.value; i++) {
    let uuid = generateUUID()

    if (!withHyphens.value) {
      uuid = uuid.replace(/-/g, '')
    }

    if (uppercase.value) {
      uuid = uuid.toUpperCase()
    }

    uuids.value.push(uuid)
  }
}

// 复制所有
const copyAll = () => {
  return uuids.value.join('\n')
}

// 初始生成
generate()
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">UUID 生成器</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">生成符合 RFC 4122 标准的 UUID v4</p>

      <div class="space-y-4">
        <!-- 配置选项 -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium mb-2">生成数量</label>
            <input
              v-model.number="count"
              type="number"
              min="1"
              max="100"
              class="tool-input"
            >
          </div>

          <div class="flex items-center gap-2 md:col-span-2 md:pt-8">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="uppercase" type="checkbox" class="w-4 h-4">
              <span class="text-sm">大写</span>
            </label>

            <label class="flex items-center gap-2 cursor-pointer ml-4">
              <input v-model="withHyphens" type="checkbox" class="w-4 h-4">
              <span class="text-sm">包含连字符</span>
            </label>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button @click="generate" class="btn-primary">生成</button>
          <CopyButton v-if="uuids.length > 0" :text="copyAll()" />
        </div>

        <!-- UUID 列表 -->
        <div v-if="uuids.length > 0" class="space-y-2">
          <h3 class="font-semibold">生成结果 ({{ uuids.length }})</h3>

          <div class="max-h-96 overflow-y-auto space-y-2">
            <div
              v-for="(uuid, index) in uuids"
              :key="index"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div class="font-mono text-sm">{{ uuid }}</div>
              <CopyButton :text="uuid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
