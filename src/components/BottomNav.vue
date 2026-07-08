<template>
  <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 z-50 safe-area-bottom">
    <div class="flex items-center justify-around h-16">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1 h-full text-gray-500 transition-all duration-300 hover:text-primary group"
        active-class="text-primary"
      >
        <span class="text-2xl mb-1 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{{ item.icon }}</span>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
const navItems = [
  { label: '首页', path: '/', icon: '🏠' },
  { label: '星座', path: '/constellation', icon: '⭐' },
  { label: '吉日', path: '/auspicious-day', icon: '📅' },
  { label: '测算', path: '/fun', icon: '🎯' },
]
</script>

<style scoped>
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}
</style>
