<!--
  工具名称: 颜色转换
  功能描述: HEX/RGB/HSL 颜色格式互转
-->
<script setup>
import { ref, computed, watch } from 'vue'
import { useLocalStorage } from '@/composables/useLocalStorage'
import CopyButton from '@/components/common/CopyButton.vue'

const hexInput = useLocalStorage('tool-color-hex', '#3B82F6')
const rgbR = ref(59)
const rgbG = ref(130)
const rgbB = ref(246)

// HEX 转 RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

// RGB 转 HEX
const rgbToHex = (r, g, b) => {
  return '#' + [r, g, b].map(x => {
    const hex = x.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('').toUpperCase()
}

// RGB 转 HSL
const rgbToHsl = (r, g, b) => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  }
}

// 监听 HEX 输入
watch(hexInput, (newHex) => {
  const rgb = hexToRgb(newHex)
  if (rgb) {
    rgbR.value = rgb.r
    rgbG.value = rgb.g
    rgbB.value = rgb.b
  }
})

// 监听 RGB 输入
watch([rgbR, rgbG, rgbB], () => {
  hexInput.value = rgbToHex(rgbR.value, rgbG.value, rgbB.value)
})

// 计算所有格式
const colorFormats = computed(() => {
  const hex = hexInput.value
  const rgb = { r: rgbR.value, g: rgbG.value, b: rgbB.value }
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

  return {
    hex: hex,
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    rgba: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
    hsla: `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1)`
  }
})
</script>

<template>
  <div class="tool-container">
    <div class="tool-card">
      <h2 class="text-2xl font-bold mb-2">颜色转换</h2>
      <p class="text-gray-600 dark:text-gray-400 mb-6">HEX / RGB / HSL 颜色格式互转</p>

      <div class="space-y-6">
        <!-- 颜色预览 -->
        <div class="flex items-center gap-4">
          <div
            class="w-32 h-32 rounded-xl border-4 border-gray-200 dark:border-slate-700 shadow-lg"
            :style="{ backgroundColor: hexInput }"
          ></div>

          <div class="flex-1">
            <label class="block text-sm font-medium mb-2">HEX 颜色</label>
            <input
              v-model="hexInput"
              type="text"
              placeholder="#3B82F6"
              class="tool-input font-mono"
            >
          </div>
        </div>

        <!-- RGB 输入 -->
        <div>
          <label class="block text-sm font-medium mb-2">RGB 颜色</label>
          <div class="grid grid-cols-3 gap-3">
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">R (0-255)</label>
              <input
                v-model.number="rgbR"
                type="number"
                min="0"
                max="255"
                class="tool-input"
              >
            </div>
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">G (0-255)</label>
              <input
                v-model.number="rgbG"
                type="number"
                min="0"
                max="255"
                class="tool-input"
              >
            </div>
            <div>
              <label class="block text-xs text-gray-500 dark:text-gray-400 mb-1">B (0-255)</label>
              <input
                v-model.number="rgbB"
                type="number"
                min="0"
                max="255"
                class="tool-input"
              >
            </div>
          </div>
        </div>

        <!-- 所有格式 -->
        <div class="space-y-3">
          <h3 class="font-semibold">所有格式</h3>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">HEX</div>
              <div class="font-mono">{{ colorFormats.hex }}</div>
            </div>
            <CopyButton :text="colorFormats.hex" />
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">RGB</div>
              <div class="font-mono">{{ colorFormats.rgb }}</div>
            </div>
            <CopyButton :text="colorFormats.rgb" />
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">RGBA</div>
              <div class="font-mono">{{ colorFormats.rgba }}</div>
            </div>
            <CopyButton :text="colorFormats.rgba" />
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">HSL</div>
              <div class="font-mono">{{ colorFormats.hsl }}</div>
            </div>
            <CopyButton :text="colorFormats.hsl" />
          </div>

          <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-lg">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">HSLA</div>
              <div class="font-mono">{{ colorFormats.hsla }}</div>
            </div>
            <CopyButton :text="colorFormats.hsla" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
