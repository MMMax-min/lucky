import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface HistoryRecord {
  id: string
  type: 'wuxing' | 'constellation' | 'auspicious' | 'fun'
  title: string
  input: any
  result: any
  timestamp: number
}

export interface FavoriteItem {
  id: string
  type: string
  title: string
  data: any
  timestamp: number
}

export const useUserStore = defineStore('user', () => {
  const history = ref<HistoryRecord[]>([])
  const favorites = ref<FavoriteItem[]>([])

  function loadHistory() {
    const data = JSON.parse(localStorage.getItem('wuxing_app_history') || '{"records":[]}')
    history.value = data.records || []
  }

  function saveHistory(record: HistoryRecord) {
    history.value.unshift(record)
    if (history.value.length > 10) {
      history.value = history.value.slice(0, 10)
    }
    localStorage.setItem('wuxing_app_history', JSON.stringify({ records: history.value, lastUpdated: Date.now() }))
  }

  function deleteHistory(id: string) {
    history.value = history.value.filter(r => r.id !== id)
    localStorage.setItem('wuxing_app_history', JSON.stringify({ records: history.value, lastUpdated: Date.now() }))
  }

  function clearHistory() {
    history.value = []
    localStorage.removeItem('wuxing_app_history')
  }

  function loadFavorites() {
    const data = JSON.parse(localStorage.getItem('wuxing_app_favorites') || '{"items":[]}')
    favorites.value = data.items || []
  }

  function addFavorite(item: FavoriteItem) {
    favorites.value.unshift(item)
    if (favorites.value.length > 20) {
      favorites.value = favorites.value.slice(0, 20)
    }
    localStorage.setItem('wuxing_app_favorites', JSON.stringify({ items: favorites.value }))
  }

  function removeFavorite(id: string) {
    favorites.value = favorites.value.filter(f => f.id !== id)
    localStorage.setItem('wuxing_app_favorites', JSON.stringify({ items: favorites.value }))
  }

  loadHistory()
  loadFavorites()

  return {
    history,
    favorites,
    saveHistory,
    deleteHistory,
    clearHistory,
    addFavorite,
    removeFavorite,
    loadHistory,
    loadFavorites,
  }
})
