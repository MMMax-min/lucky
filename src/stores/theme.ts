import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<'light' | 'dark'>(
    (localStorage.getItem('wuxing_app_settings')
      ? JSON.parse(localStorage.getItem('wuxing_app_settings')!).theme
      : 'light') as 'light' | 'dark'
  )

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    saveTheme()
  }

  function setTheme(t: 'light' | 'dark') {
    theme.value = t
    saveTheme()
  }

  function saveTheme() {
    const settings = JSON.parse(localStorage.getItem('wuxing_app_settings') || '{}')
    settings.theme = theme.value
    localStorage.setItem('wuxing_app_settings', JSON.stringify(settings))
  }

  watch(theme, (val) => {
    document.documentElement.setAttribute('data-theme', val)
  }, { immediate: true })

  return { theme, toggleTheme, setTheme }
})
