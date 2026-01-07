<!--
  工具名称: 密码生成器
  功能描述: 生成随机密码
-->
<script setup>
import { ref, computed } from 'vue'
import CopyButton from '@/components/common/CopyButton.vue'

const password = ref('')
const length = ref(16)
const includeUppercase = ref(true)
const includeLowercase = ref(true)
const includeNumbers = ref(true)
const includeSymbols = ref(true)

const charsets = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
}

// 密码强度
const strength = computed(() => {
  const len = password.value.length
  const hasUpper = /[A-Z]/.test(password.value)
  const hasLower = /[a-z]/.test(password.value)
  const hasNumber = /[0-9]/.test(password.value)
  const hasSymbol = /[^A-Za-z0-9]/.test(password.value)

  let score = 0
  if (len >= 8) score++
  if (len >= 12) score++
  if (len >= 16) score++
  if (hasUpper) score++
  if (hasLower) score++
  if (hasNumber) score++
  if (hasSymbol) score++

  if (score <= 2) return { level: '弱', color: 'red', percent: 25 }
  if (score <= 4) return { level: '中', color: 'orange', percent: 50 }
  if (score <= 6) return { level: '强', color: 'green', percent: 75 }
  return { level: '非常强', color: 'blue', percent: 100 }
})

// 生成密码
const generate = () => {
  let charset = ''
  if (includeUppercase.value) charset += charsets.uppercase
  if (includeLowercase.value) charset += charsets.lowercase
  if (includeNumbers.value) charset += charsets.numbers
  if (includeSymbols.value) charset += charsets.symbols

  if (!charset) {
    password.value = ''
    return
  }

  let result = ''
  for (let i = 0; i < length.value; i++) {
    result += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  password.value = result
}

// 初始生成
generate()
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">密码生成器</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">生成安全的随机密码</p>

      <div class="space-y-4">
        <!-- 密码显示 -->
        <div>
          <label class="block text-sm font-medium mb-2">生成的密码</label>
          <div class="flex gap-3">
            <input
              v-model="password"
              type="text"
              readonly
              class="tool-input flex-1 font-mono text-lg"
            >
            <CopyButton :text="password" />
          </div>
        </div>

        <!-- 密码强度 -->
        <div v-if="password">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm font-medium">密码强度</span>
            <span :class="`text-sm font-semibold text-${strength.color}-600 dark:text-${strength.color}-400`">
              {{ strength.level }}
            </span>
          </div>
          <div class="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              :class="`h-full bg-${strength.color}-500 transition-all duration-300`"
              :style="{ width: `${strength.percent}%` }"
            ></div>
          </div>
        </div>

        <!-- 长度设置 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-sm font-medium">密码长度</label>
            <span class="text-sm font-semibold">{{ length }}</span>
          </div>
          <input
            v-model.number="length"
            type="range"
            min="4"
            max="64"
            class="w-full"
          >
          <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <!-- 字符选项 -->
        <div class="space-y-2">
          <label class="text-sm font-medium">包含字符</label>

          <label class="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <input v-model="includeUppercase" type="checkbox" class="w-4 h-4">
            <span>大写字母 (A-Z)</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <input v-model="includeLowercase" type="checkbox" class="w-4 h-4">
            <span>小写字母 (a-z)</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <input v-model="includeNumbers" type="checkbox" class="w-4 h-4">
            <span>数字 (0-9)</span>
          </label>

          <label class="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 dark:bg-slate-900 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <input v-model="includeSymbols" type="checkbox" class="w-4 h-4">
            <span>符号 (!@#$%^&*...)</span>
          </label>
        </div>

        <!-- 生成按钮 -->
        <button @click="generate" class="btn-primary w-full">重新生成</button>
      </div>
    </div>
  </div>
</template>
