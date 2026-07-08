<template>
  <div class="page-container pb-20 md:pb-6">
    <h1 class="font-serif font-bold text-2xl text-gray-800 mb-6 flex items-center gap-2">
      <span class="animate-wiggle">⭐</span> 星座运势
    </h1>

    <!-- 星座选择 -->
    <div class="grid grid-cols-3 md:grid-cols-4 gap-3 mb-8">
      <button
        v-for="(info, key) in constellations"
        :key="key"
        @click="selectConstellation(key)"
        class="card text-center transition-all duration-300 hover-lift"
        :class="selected === key ? 'ring-2 ring-primary shadow-chinese bg-gradient-to-br from-primary/5 to-gold/5' : ''"
      >
        <div class="text-3xl mb-2 transition-transform duration-300" :class="selected === key ? 'scale-125' : ''">{{ info.symbol }}</div>
        <div class="font-bold text-sm text-gray-800">{{ info.name }}</div>
        <div class="text-xs text-gray-500">{{ info.dateRange }}</div>
      </button>
    </div>

    <!-- 运势结果 -->
    <div v-if="fortune" class="space-y-6 animate-slide-up">
      <!-- 星座信息卡片 -->
      <div class="card chinese-border bg-gradient-to-br from-white via-primary/5 to-gold/5">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="font-serif font-bold text-2xl text-gray-800">{{ fortune.constellation.name }}</h2>
            <p class="text-sm text-gray-500">{{ fortune.constellation.dateRange }}</p>
          </div>
          <div class="text-6xl animate-float">{{ fortune.constellation.symbol }}</div>
        </div>

        <!-- 时间切换 -->
        <div class="flex gap-2 mb-6">
          <button
            v-for="t in tabs"
            :key="t.value"
            @click="switchTab(t.value)"
            class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
            :class="currentTab === t.value ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-chinese' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
          >
            {{ t.icon }} {{ t.label }}
          </button>
        </div>

        <!-- 运势分数 -->
        <div class="text-center mb-6">
          <div class="inline-block relative">
            <div class="text-6xl font-bold gradient-text">{{ fortune.overall }}</div>
            <div class="absolute -top-2 -right-4 text-2xl animate-bounce-in">✨</div>
          </div>
          <div class="text-sm text-gray-500 mt-2">综合运势</div>
          <div class="mt-2 text-lg" :getFortuneEmoji="fortune.overall">
            {{ getFortuneText(fortune.overall) }}
          </div>
        </div>

        <!-- 五维运势 -->
        <div class="space-y-4">
          <div v-for="(value, key) in fortune.dimensions" :key="key" class="group">
            <div class="flex items-center gap-3 mb-1">
              <span class="w-12 text-sm font-medium text-gray-600">{{ dimensionNames[key] }}</span>
              <div class="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden relative">
                <div
                  class="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  :style="{ width: value + '%' }"
                  :class="getDimensionColor(key)"
                >
                  <div class="absolute inset-0 shimmer"></div>
                </div>
              </div>
              <span class="w-10 text-right text-sm font-bold" :class="getDimensionTextColor(key)">{{ value }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 运势分析 -->
      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
          <span class="text-xl">📝</span> 运势详解
        </h3>
        <p class="text-gray-600 whitespace-pre-line leading-relaxed">{{ fortune.description }}</p>
      </div>

      <!-- 幸运元素 -->
      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <span class="text-xl">🍀</span> 幸运指南
        </h3>
        <div class="grid grid-cols-2 gap-3">
          <div class="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl text-center hover:scale-105 transition-transform cursor-default">
            <div class="text-2xl mb-1">🎨</div>
            <div class="text-xs text-gray-500 mb-1">幸运色</div>
            <div class="font-bold text-pink-600">{{ fortune.lucky.color }}</div>
          </div>
          <div class="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl text-center hover:scale-105 transition-transform cursor-default">
            <div class="text-2xl mb-1">🔢</div>
            <div class="text-xs text-gray-500 mb-1">幸运数字</div>
            <div class="font-bold text-blue-600">{{ fortune.lucky.number }}</div>
          </div>
          <div class="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl text-center hover:scale-105 transition-transform cursor-default">
            <div class="text-2xl mb-1">🧭</div>
            <div class="text-xs text-gray-500 mb-1">幸运方位</div>
            <div class="font-bold text-green-600">{{ fortune.lucky.direction }}</div>
          </div>
          <div class="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl text-center hover:scale-105 transition-transform cursor-default">
            <div class="text-2xl mb-1">💎</div>
            <div class="text-xs text-gray-500 mb-1">幸运宝石</div>
            <div class="font-bold text-purple-600">{{ fortune.lucky.gemstone }}</div>
          </div>
        </div>
      </div>

      <!-- 速配星座 -->
      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-3 flex items-center gap-2">
          <span class="text-xl">💕</span> 速配星座
        </h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="c in fortune.compatible"
            :key="c"
            class="px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-sm font-medium hover:scale-110 transition-transform cursor-default"
          >
            {{ c }}
          </span>
        </div>
      </div>

      <!-- 星座配对 -->
      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <span class="text-xl">💑</span> 星座配对
        </h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-600 mb-2">选个对象配对看看？</label>
            <select v-model="matchConstellation" class="input-field">
              <option value="">请选择星座</option>
              <option v-for="(info, key) in constellations" :key="key" :value="key">
                {{ info.symbol }} {{ info.name }}
              </option>
            </select>
          </div>
          <div v-if="matchResult" class="p-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-200 animate-bounce-in">
            <div class="text-center mb-4">
              <div class="inline-block relative">
                <div class="text-5xl font-bold gradient-text">{{ matchResult.index }}</div>
                <div class="absolute -top-1 -right-3 text-xl">💯</div>
              </div>
              <div class="text-sm text-gray-500 mt-1">配对指数</div>
              <div class="mt-2 px-4 py-1 inline-block rounded-full text-sm font-bold" :class="matchLevelClass">
                {{ matchLevelEmoji }} {{ matchLevelText }}
              </div>
            </div>
            <p class="text-gray-600 mb-4 leading-relaxed">{{ matchResult.description }}</p>
            <div class="space-y-2 text-sm">
              <div class="flex items-start gap-2">
                <span class="text-green-500">✅</span>
                <span><span class="font-medium text-green-700">优势：</span>{{ matchResult.strengths.join('、') }}</span>
              </div>
              <div v-if="matchResult.weaknesses.length" class="flex items-start gap-2">
                <span class="text-yellow-500">⚠️</span>
                <span><span class="font-medium text-yellow-700">注意：</span>{{ matchResult.weaknesses.join('、') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 未选择提示 -->
    <div v-else class="text-center py-12">
      <div class="text-6xl mb-4 animate-float">⭐</div>
      <p class="text-gray-500">点击上方星座，查看今日运势~</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import constellationData from '@/data/constellation.json'
import { getConstellationFortune, getConstellationMatch } from '@/api/constellation'
import type { Constellation, FortuneResult, MatchResult } from '@/types'

const constellations = constellationData.constellations as Record<string, any>

const selected = ref<Constellation | ''>('')
const currentTab = ref<'daily' | 'weekly' | 'monthly'>('daily')
const fortune = ref<FortuneResult | null>(null)
const matchConstellation = ref('')
const matchResult = ref<MatchResult | null>(null)

const tabs = [
  { label: '今日', value: 'daily' as const, icon: '📅' },
  { label: '本周', value: 'weekly' as const, icon: '📆' },
  { label: '本月', value: 'monthly' as const, icon: '🗓️' },
]

const dimensionNames: Record<string, string> = {
  love: '💕 爱情', career: '💼 事业', wealth: '💰 财运', health: '🏃 健康', social: '👥 社交',
}

const matchLevelClass = computed(() => {
  const level = matchResult.value?.level
  if (level === 'excellent') return 'bg-green-100 text-green-700'
  if (level === 'good') return 'bg-blue-100 text-blue-700'
  if (level === 'average') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
})

const matchLevelEmoji = computed(() => {
  const level = matchResult.value?.level
  if (level === 'excellent') return '💕'
  if (level === 'good') return '👍'
  if (level === 'average') return '😐'
  return '💔'
})

const matchLevelText = computed(() => {
  const level = matchResult.value?.level
  if (level === 'excellent') return '天生一对'
  if (level === 'good') return '很合适'
  if (level === 'average') return '一般般'
  return '需要努力'
})

function getFortuneText(score: number): string {
  if (score >= 90) return '🎉 运势爆棚，今天适合搞大事！'
  if (score >= 80) return '✨ 运势不错，抓住机会~'
  if (score >= 70) return '😊 运势平稳，正常发挥'
  if (score >= 60) return '🤔 运势一般，谨慎行事'
  return '😅 运势欠佳，宜静不宜动'
}

function getDimensionColor(key: string): string {
  const colors: Record<string, string> = {
    love: 'bg-gradient-to-r from-pink-400 to-rose-400',
    career: 'bg-gradient-to-r from-blue-400 to-cyan-400',
    wealth: 'bg-gradient-to-r from-yellow-400 to-amber-400',
    health: 'bg-gradient-to-r from-green-400 to-emerald-400',
    social: 'bg-gradient-to-r from-purple-400 to-violet-400',
  }
  return colors[key] || 'bg-primary'
}

function getDimensionTextColor(key: string): string {
  const colors: Record<string, string> = {
    love: 'text-pink-600',
    career: 'text-blue-600',
    wealth: 'text-yellow-600',
    health: 'text-green-600',
    social: 'text-purple-600',
  }
  return colors[key] || 'text-primary'
}

function selectConstellation(key: string) {
  selected.value = key as Constellation
  loadFortune()
}

function switchTab(tab: 'daily' | 'weekly' | 'monthly') {
  currentTab.value = tab
  loadFortune()
}

function loadFortune() {
  if (!selected.value) return
  fortune.value = getConstellationFortune(selected.value, undefined, currentTab.value)
  if (matchConstellation.value) {
    loadMatch()
  }
}

function loadMatch() {
  if (!selected.value || !matchConstellation.value) return
  matchResult.value = getConstellationMatch(selected.value, matchConstellation.value as Constellation)
}

watch(matchConstellation, () => {
  if (matchConstellation.value && selected.value) {
    loadMatch()
  }
})
</script>
