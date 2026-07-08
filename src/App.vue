<template>
  <div class="min-h-screen bg-gradient-to-br from-cream via-white to-cream font-sans" :data-theme="theme">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-20 left-10 text-6xl opacity-5 animate-float">☯</div>
      <div class="absolute top-40 right-20 text-4xl opacity-5 animate-float" style="animation-delay: 1s;">⭐</div>
      <div class="absolute bottom-40 left-20 text-5xl opacity-5 animate-float" style="animation-delay: 2s;">🌙</div>
      <div class="absolute bottom-20 right-10 text-3xl opacity-5 animate-float" style="animation-delay: 0.5s;">✨</div>
    </div>

    <AppHeader v-if="route.meta.showHeader !== false" />
    
    <main class="flex-1 relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="chinese" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <BottomNav v-if="route.meta.showFooter !== false" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import AppHeader from '@/components/AppHeader.vue'
import BottomNav from '@/components/BottomNav.vue'

const route = useRoute()
const themeStore = useThemeStore()
const theme = computed(() => themeStore.theme)
</script>
