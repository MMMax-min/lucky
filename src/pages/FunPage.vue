<template>
  <div class="page-container pb-20 md:pb-6">
    <h1 class="font-serif font-bold text-2xl text-gray-800 mb-6">趣味测算</h1>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <router-link
        v-for="item in funItems"
        :key="item.type"
        :to="`/fun/${item.type}`"
        class="card text-center group hover:shadow-chinese transition-all duration-300"
      >
        <div class="w-14 h-14 mx-auto mb-3 rounded-full flex items-center justify-center" :class="item.bgClass">
          <span class="text-2xl">{{ item.icon }}</span>
        </div>
        <h3 class="font-medium text-gray-800 group-hover:text-primary transition-colors">{{ item.title }}</h3>
        <p class="text-xs text-gray-500 mt-1">{{ item.desc }}</p>
      </router-link>
    </div>

    <div v-if="userStore.history.length" class="mb-8">
      <h2 class="font-serif font-bold text-lg text-gray-800 mb-4">最近测算</h2>
      <div class="space-y-2">
        <div
          v-for="record in userStore.history.slice(0, 5)"
          :key="record.id"
          class="card flex items-center gap-3 cursor-pointer hover:shadow-lg transition-all"
        >
          <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg">
            {{ record.type === 'wuxing' ? '☯' : record.type === 'constellation' ? '⭐' : record.type === 'auspicious' ? '📅' : '🎯' }}
          </div>
          <div class="flex-1">
            <div class="font-medium text-gray-800 text-sm">{{ record.title }}</div>
            <div class="text-xs text-gray-500">{{ formatDate(record.timestamp) }}</div>
          </div>
          <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const funItems = [
  { type: 'zodiac', title: '生肖速测', desc: '查看生肖运势', icon: '🐲', bgClass: 'bg-red-100 text-red-600' },
  { type: 'love', title: '简易姻缘', desc: '测试缘分指数', icon: '💕', bgClass: 'bg-pink-100 text-pink-600' },
  { type: 'name', title: '姓名测试', desc: '姓名五格分析', icon: '📝', bgClass: 'bg-blue-100 text-blue-600' },
  { type: 'number', title: '号码吉凶', desc: '测试号码运势', icon: '🔢', bgClass: 'bg-purple-100 text-purple-600' },
]

function formatDate(ts: number) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}
</script>
