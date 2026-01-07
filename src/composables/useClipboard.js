/**
 * 剪贴板操作 Composable
 * 提供复制到剪贴板功能
 */
import { ref } from 'vue'

export function useClipboard() {
  const copied = ref(false)
  let timer = null

  /**
   * 复制文本到剪贴板
   * @param {string} text - 要复制的文本
   */
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true

      // 清除之前的定时器
      if (timer) clearTimeout(timer)

      // 2秒后重置状态
      timer = setTimeout(() => {
        copied.value = false
      }, 2000)

      return true
    } catch (error) {
      console.error('复制失败:', error)
      return false
    }
  }

  return {
    copied,
    copy
  }
}
