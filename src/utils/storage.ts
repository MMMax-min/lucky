const PREFIX = 'wuxing_app_'

export const StorageManager = {
  save(key: string, data: any, options?: { expires?: number; maxSize?: number }): boolean {
    try {
      const item = {
        data,
        timestamp: Date.now(),
        expires: options?.expires ? Date.now() + options.expires : null,
      }
      localStorage.setItem(PREFIX + key, JSON.stringify(item))
      return true
    } catch {
      return false
    }
  },

  load<T = any>(key: string): T | null {
    try {
      const raw = localStorage.getItem(PREFIX + key)
      if (!raw) return null
      const item = JSON.parse(raw)
      if (item.expires && Date.now() > item.expires) {
        localStorage.removeItem(PREFIX + key)
        return null
      }
      return item.data as T
    } catch {
      return null
    }
  },

  remove(key: string): boolean {
    try {
      localStorage.removeItem(PREFIX + key)
      return true
    } catch {
      return false
    }
  },

  getSize(key: string): number {
    const raw = localStorage.getItem(PREFIX + key)
    return raw ? new Blob([raw]).size : 0
  },

  cleanExpired(): void {
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i)
      if (key && key.startsWith(PREFIX) && key !== PREFIX + 'settings') {
        try {
          const item = JSON.parse(localStorage.getItem(key) || '{}')
          if (item.expires && Date.now() > item.expires) {
            localStorage.removeItem(key)
          }
        } catch {
          localStorage.removeItem(key)
        }
      }
    }
  },

  cleanAll(): void {
    const keys: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (key && key.startsWith(PREFIX)) {
        keys.push(key)
      }
    }
    keys.forEach(k => localStorage.removeItem(k))
  },
}
