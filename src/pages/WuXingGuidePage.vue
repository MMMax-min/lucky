<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="五行化解" :show-back="true" />

    <div class="mt-6 space-y-6">
      <div v-for="element in elements" :key="element.name" class="card chinese-border">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-full flex items-center justify-center" :style="{ backgroundColor: element.color + '20' }">
            <span class="text-2xl font-bold" :style="{ color: element.color }">{{ element.symbol }}</span>
          </div>
          <div>
            <h3 class="font-serif font-bold text-lg text-gray-800">{{ element.name }}</h3>
            <p class="text-sm text-gray-500">{{ element.description }}</p>
          </div>
        </div>

        <div class="space-y-3">
          <div>
            <h4 class="font-medium text-gray-700 text-sm mb-2">补救颜色</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="c in element.colors" :key="c" class="px-3 py-1 bg-cream text-sm rounded">{{ c }}</span>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-700 text-sm mb-2">吉祥方位</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="d in element.directions" :key="d" class="px-3 py-1 bg-cream text-sm rounded">{{ d }}</span>
            </div>
          </div>
          <div>
            <h4 class="font-medium text-gray-700 text-sm mb-2">适合行业</h4>
            <div class="flex flex-wrap gap-2">
              <span v-for="i in element.industries" :key="i" class="px-3 py-1 bg-cream text-sm rounded">{{ i }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">五行相生相克</h3>
        <div class="grid grid-cols-5 gap-2 text-center text-sm">
          <div v-for="e in elementNames" :key="e" class="p-2 bg-cream rounded">
            <div class="font-bold text-primary">{{ e }}</div>
          </div>
        </div>
        <div class="mt-4 space-y-2 text-sm text-gray-600">
          <p><span class="font-medium text-green-600">相生：</span>木生火、火生土、土生金、金生水、水生木</p>
          <p><span class="font-medium text-red-500">相克：</span>木克土、土克水、水克火、火克金、金克木</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

const elements = [
  {
    name: '金', symbol: '金', color: '#FFD700', description: '金主义，性刚烈',
    colors: ['白色', '金色', '银色'], directions: ['西方'], industries: ['金融', '银行', '五金', '珠宝'],
  },
  {
    name: '木', symbol: '木', color: '#228B22', description: '木主仁，性温和',
    colors: ['绿色', '青色', '翠色'], directions: ['东方'], industries: ['教育', '文化', '出版', '林业'],
  },
  {
    name: '水', symbol: '水', color: '#4169E1', description: '水主智，性聪慧',
    colors: ['黑色', '蓝色', '灰色'], directions: ['北方'], industries: ['物流', '旅游', '传媒', '渔业'],
  },
  {
    name: '火', symbol: '火', color: '#DC143C', description: '火主礼，性急躁',
    colors: ['红色', '紫色', '橙色'], directions: ['南方'], industries: ['餐饮', '娱乐', '互联网', '电子'],
  },
  {
    name: '土', symbol: '土', color: '#DAA520', description: '土主信，性稳重',
    colors: ['黄色', '棕色', '咖啡色'], directions: ['中央'], industries: ['房地产', '建筑', '农业', '矿业'],
  },
]

const elementNames = ['金', '木', '水', '火', '土']
</script>
