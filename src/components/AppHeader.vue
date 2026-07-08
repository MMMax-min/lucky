<template>
  <header class="bg-white/80 backdrop-blur-sm border-b border-primary/10 sticky top-0 z-50">
    <div class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <router-link to="/" class="flex items-center gap-2 group">
          <div class="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-chinese group-hover:scale-110 transition-transform duration-300">
            <span class="text-gold text-lg font-bold animate-wiggle group-hover:animate-spin">☯</span>
          </div>
          <span class="font-serif font-bold text-primary text-xl hidden sm:block gradient-text">算一卦？</span>
        </router-link>
      </div>
      
      <nav class="hidden md:flex items-center gap-1">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary hover:bg-primary/5 transition-all duration-300"
          active-class="text-primary bg-primary/10"
        >
          <span class="mr-1">{{ item.icon }}</span>
          {{ item.label }}
        </router-link>
      </nav>
      
      <div class="flex items-center gap-3">
        <button
          @click="themeStore.toggleTheme()"
          class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110"
          :title="themeStore.theme === 'light' ? '切换夜间模式' : '切换日间模式'"
        >
          <span class="text-xl transition-transform duration-300" :class="themeStore.theme === 'light' ? 'rotate-0' : 'rotate-180'">
            {{ themeStore.theme === 'light' ? '🌙' : '☀️' }}
          </span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const navItems = [
  { label: '五行', path: '/wuxing', icon: '☯' },
  { label: '星座', path: '/constellation', icon: '⭐' },
  { label: '吉日', path: '/auspicious-day', icon: '📅' },
  { label: '趣味', path: '/fun', icon: '🎯' },
]
</script>
