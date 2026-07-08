<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="择吉工具" :show-back="true" />

    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <router-link
        v-for="tool in tools"
        :key="tool.path"
        :to="tool.path"
        class="card text-center group hover:shadow-chinese transition-all duration-300"
      >
        <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" :class="tool.bgClass">
          <span class="text-2xl">{{ tool.icon }}</span>
        </div>
        <h3 class="font-medium text-gray-800 group-hover:text-primary transition-colors">{{ tool.title }}</h3>
        <p class="text-xs text-gray-500 mt-1">{{ tool.desc }}</p>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

const tools = [
  { title: '吉时查询', desc: '查看今日吉时', path: '/auspicious-day', icon: '⏰', bgClass: 'bg-primary/10 text-primary' },
  { title: '黄历查询', desc: '每日黄历宜忌', path: '/auspicious-day', icon: '📅', bgClass: 'bg-gold/10 text-gold' },
  { title: '生肖冲煞', desc: '查看冲煞方位', path: '/auspicious-day', icon: '🐲', bgClass: 'bg-emerald/10 text-emerald' },
  { title: '五行化解', desc: '五行补救方案', path: '/wuxing-guide', icon: '☯', bgClass: 'bg-purple-100 text-purple-600' },
]
</script>
