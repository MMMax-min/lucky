<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="吉日查询" :show-back="true" />

    <div class="mt-6 space-y-6">
      <!-- 查询表单 -->
      <div class="card chinese-border">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <span class="text-xl animate-wiggle">📅</span> 选个好日子
        </h2>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">办啥事？</label>
            <select v-model="query.eventType" class="input-field">
              <option v-for="type in eventTypes" :key="type.value" :value="type.value">
                {{ type.icon }} {{ type.label }}
              </option>
            </select>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">从哪天开始</label>
              <input v-model="query.startDate" type="date" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">查到哪天</label>
              <input v-model="query.endDate" type="date" class="input-field" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">避开谁的生肖？（可选）</label>
            <select v-model="query.avoidZodiac" class="input-field">
              <option value="">随便查</option>
              <option v-for="z in zodiacs" :key="z" :value="z">{{ z }} {{ getZodiacEmoji(z) }}</option>
            </select>
          </div>

          <button @click="search" class="btn-primary w-full text-lg py-4" :disabled="searching">
            <span v-if="searching" class="flex items-center justify-center gap-2">
              <span class="animate-spin">⏳</span> 查找中...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="animate-wiggle">🔍</span> 查吉日
            </span>
          </button>
        </div>
      </div>

      <!-- 查询结果 -->
      <div v-if="results.length" class="space-y-4 animate-slide-up">
        <div class="flex items-center justify-between">
          <h3 class="font-serif font-bold text-lg text-gray-800 flex items-center gap-2">
            <span class="text-xl">✨</span> 找到 {{ results.length }} 个好日子
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="day in results"
            :key="day.date"
            @click="showDetail(day)"
            class="card cursor-pointer transition-all duration-300 hover-lift"
            :class="{
              'border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-white': day.level === 'auspicious',
              'border-l-4 border-gray-300': day.level === 'neutral',
              'border-l-4 border-red-400 bg-gradient-to-r from-red-50 to-white': day.level === 'inauspicious',
            }"
          >
            <div class="flex items-center justify-between mb-2">
              <div>
                <div class="font-bold text-gray-800 text-lg">{{ day.date }}</div>
                <div class="text-xs text-gray-500">{{ day.weekday }} · {{ day.lunarDate }}</div>
              </div>
              <div class="text-right">
                <div class="text-gold text-lg">{{ getStarRating(day.recommendation) }}</div>
                <div class="text-sm font-bold" :class="levelClass(day.level)">{{ levelText(day.level) }}</div>
              </div>
            </div>
            <div class="flex flex-wrap gap-1">
              <span
                v-for="s in day.suitable.slice(0, 3)"
                :key="s"
                class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium"
              >
                {{ s }}
              </span>
              <span v-if="day.suitable.length > 3" class="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                +{{ day.suitable.length - 3 }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <EmptyState
        v-if="!results.length && searched"
        message="没找到合适的吉日，换个条件试试？"
        action-text="重新查询"
        @action="search"
      />
    </div>

    <!-- 详情弹窗 -->
    <Teleport to="body">
      <div
        v-if="selectedDay"
        class="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center"
        @click.self="selectedDay = null"
      >
        <div class="bg-white rounded-t-3xl md:rounded-3xl w-full md:max-w-md max-h-[85vh] overflow-y-auto p-6 animate-slide-up">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-serif font-bold text-2xl text-gray-800">{{ selectedDay.date }}</h3>
            <button @click="selectedDay = null" class="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-transform hover:rotate-90">
              <span class="text-xl">✕</span>
            </button>
          </div>

          <div class="space-y-4">
            <div class="text-center p-4 bg-gradient-to-br from-gold/10 to-primary/5 rounded-xl">
              <div class="text-3xl mb-2">{{ getStarRating(selectedDay.recommendation) }}</div>
              <div class="text-sm text-gray-500">{{ selectedDay.weekday }} · {{ selectedDay.lunarDate }}</div>
              <div class="mt-2 text-lg font-bold" :class="levelClass(selectedDay.level)">{{ levelText(selectedDay.level) }}</div>
            </div>

            <div class="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <h4 class="font-bold text-green-700 mb-2 flex items-center gap-2">
                <span>✅</span> 宜
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="s in selectedDay.suitable"
                  :key="s"
                  class="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium"
                >
                  {{ s }}
                </span>
              </div>
            </div>

            <div class="p-4 bg-gradient-to-br from-red-50 to-pink-50 rounded-xl">
              <h4 class="font-bold text-red-700 mb-2 flex items-center gap-2">
                <span>⚠️</span> 忌
              </h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="a in selectedDay.avoid"
                  :key="a"
                  class="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full font-medium"
                >
                  {{ a }}
                </span>
              </div>
            </div>

            <div class="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xl">🧭</span>
                <span class="font-bold text-blue-700">冲煞</span>
              </div>
              <div class="text-blue-800">冲{{ selectedDay.clash.zodiac }}（{{ selectedDay.clash.direction }}方）</div>
            </div>

            <div v-if="selectedDay.spirits.favorable.length" class="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xl">🍀</span>
                <span class="font-bold text-amber-700">吉神</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="s in selectedDay.spirits.favorable"
                  :key="s"
                  class="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full"
                >
                  {{ s }}
                </span>
              </div>
            </div>

            <button
              @click="toggleFavorite"
              class="btn-outline w-full flex items-center justify-center gap-2"
              :class="isFavorited ? 'bg-primary text-white border-primary' : ''"
            >
              <span>{{ isFavorited ? '💔' : '💝' }}</span>
              {{ isFavorited ? '取消收藏' : '收藏这个好日子' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { queryAuspiciousDays } from '@/api/auspicious'
import { useUserStore } from '@/stores/user'
import { generateId } from '@/utils/formatters'
import PageHeader from '@/components/PageHeader.vue'
import EmptyState from '@/components/EmptyState.vue'
import type { AuspiciousDay, EventType } from '@/types'

const userStore = useUserStore()

const eventTypes = [
  { label: '结婚', value: 'marriage' as EventType, icon: '💍' },
  { label: '搬家', value: 'move' as EventType, icon: '🏠' },
  { label: '出行', value: 'travel' as EventType, icon: '✈️' },
  { label: '开业', value: 'business' as EventType, icon: '🎉' },
  { label: '动土', value: 'construction' as EventType, icon: '🔨' },
  { label: '祭祀', value: 'worship' as EventType, icon: '🙏' },
  { label: '装修', value: 'renovation' as EventType, icon: '🔧' },
]

const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']

function getZodiacEmoji(zodiac: string): string {
  const emojis: Record<string, string> = {
    '鼠': '🐭', '牛': '🐮', '虎': '🐯', '兔': '🐰', '龙': '🐲', '蛇': '🐍',
    '马': '🐴', '羊': '🐑', '猴': '🐵', '鸡': '🐔', '狗': '🐶', '猪': '🐷',
  }
  return emojis[zodiac] || ''
}

function getStarRating(rating: number): string {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
}

const today = new Date()
const endDate = new Date()
endDate.setDate(endDate.getDate() + 30)

const query = reactive({
  startDate: today.toISOString().split('T')[0],
  endDate: endDate.toISOString().split('T')[0],
  eventType: 'marriage' as EventType,
  avoidZodiac: '',
})

const searching = ref(false)
const results = ref<AuspiciousDay[]>([])
const searched = ref(false)
const selectedDay = ref<AuspiciousDay | null>(null)

const isFavorited = computed(() => {
  if (!selectedDay.value) return false
  return userStore.favorites.some(f => f.data?.date === selectedDay.value?.date)
})

function search() {
  if (new Date(query.endDate) < new Date(query.startDate)) {
    alert('结束日期不能早于开始日期')
    return
  }
  searching.value = true
  results.value = []

  setTimeout(() => {
    results.value = queryAuspiciousDays({
      startDate: query.startDate,
      endDate: query.endDate,
      eventType: query.eventType,
      avoidZodiac: query.avoidZodiac || undefined,
    }).slice(0, 20)
    searching.value = false
    searched.value = true
  }, 500)
}

function showDetail(day: AuspiciousDay) {
  selectedDay.value = day
}

function toggleFavorite() {
  if (!selectedDay.value) return
  if (isFavorited.value) {
    const fav = userStore.favorites.find(f => f.data?.date === selectedDay.value?.date)
    if (fav) userStore.removeFavorite(fav.id)
  } else {
    userStore.addFavorite({
      id: generateId(),
      type: 'auspicious',
      title: `${selectedDay.value.date} 吉日`,
      data: selectedDay.value,
      timestamp: Date.now(),
    })
  }
}

function levelClass(level: string) {
  if (level === 'auspicious') return 'text-green-600'
  if (level === 'inauspicious') return 'text-red-500'
  return 'text-gray-500'
}

function levelText(level: string) {
  if (level === 'auspicious') return '🎉 大吉'
  if (level === 'inauspicious') return '😅 不宜'
  return '😐 一般'
}
</script>
