/**
 * 主题管理 Composable
 * 提供暗黑/明亮主题切换功能
 */
import { ref, watch } from 'vue'

const THEME_KEY = 'little-guai-theme'
const theme = ref('system') // 'light' | 'dark' | 'system'

export function useTheme() {
  /**
   * 初始化主题
   */
  const initTheme = () => {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'system'
    theme.value = savedTheme
    applyTheme(savedTheme)

    // 监听系统主题变化
    if (savedTheme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', handleSystemThemeChange)
    }
  }

  /**
   * 应用主题
   */
  const applyTheme = (newTheme) => {
    const isDark = newTheme === 'dark' ||
      (newTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  /**
   * 处理系统主题变化
   */
  const handleSystemThemeChange = (e) => {
    if (theme.value === 'system') {
      applyTheme('system')
    }
  }

  /**
   * 切换主题
   */
  const toggleTheme = () => {
    const themes = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme.value)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  /**
   * 设置主题
   */
  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
  }

  return {
    theme,
    initTheme,
    toggleTheme,
    setTheme
  }
}
