/**
 * LocalStorage 操作 Composable
 * 提供本地存储的读写功能
 */
import { ref, watch } from 'vue'

/**
 * 使用 LocalStorage
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 默认值
 */
export function useLocalStorage(key, defaultValue = '') {
  // 从 localStorage 读取初始值
  const storedValue = localStorage.getItem(key)
  const data = ref(storedValue !== null ? storedValue : defaultValue)

  // 监听数据变化，自动保存到 localStorage
  watch(data, (newValue) => {
    if (newValue === null || newValue === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, newValue)
    }
  })

  return data
}
