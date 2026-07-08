<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader :title="pageTitle" :show-back="true" />

    <div class="mt-6 space-y-6">
      <div class="card chinese-border" v-if="type === 'zodiac'">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4">选择您的生肖</h2>
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="z in zodiacList"
            :key="z.value"
            @click="zodiacForm.zodiac = z.value"
            class="p-3 rounded-lg text-center transition-all"
            :class="zodiacForm.zodiac === z.value ? 'bg-primary text-white' : 'bg-cream hover:bg-gray-200'"
          >
            <div class="text-xl mb-1">{{ z.icon }}</div>
            <div class="text-xs font-medium">{{ z.label }}</div>
          </button>
        </div>
        <button @click="calculateZodiac" class="btn-primary w-full mt-4">开始测算</button>
      </div>

      <div class="card chinese-border" v-if="type === 'love'">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4">输入双方姓名</h2>
        <div class="space-y-3">
          <input v-model="loveForm.name1" placeholder="输入姓名" class="input-field" />
          <input v-model="loveForm.name2" placeholder="输入对方姓名" class="input-field" />
        </div>
        <button @click="calculateLove" class="btn-primary w-full mt-4">测试姻缘</button>
      </div>

      <div class="card chinese-border" v-if="type === 'name'">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4">输入姓名</h2>
        <input v-model="nameForm.name" placeholder="输入您的姓名" class="input-field" />
        <button @click="calculateName" class="btn-primary w-full mt-4">测试姓名</button>
      </div>

      <div class="card chinese-border" v-if="type === 'number'">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4">输入号码</h2>
        <div class="space-y-3">
          <input v-model="numberForm.number" placeholder="输入号码" class="input-field" />
          <select v-model="numberForm.type" class="input-field">
            <option value="phone">手机号</option>
            <option value="license">车牌号</option>
            <option value="id">身份证号</option>
            <option value="other">其他号码</option>
          </select>
        </div>
        <button @click="calculateNumber" class="btn-primary w-full mt-4">测试号码</button>
      </div>

      <LoadingState v-if="loading" message="测算中..." />

      <div v-if="zodiacResult" class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-3">生肖运势</h3>
        <div class="space-y-3">
          <p class="text-gray-600">{{ zodiacResult.description }}</p>
          <div class="grid grid-cols-2 gap-3">
            <div class="p-3 bg-cream rounded-lg text-center">
              <div class="text-xs text-gray-500">综合运势</div>
              <div class="text-2xl font-bold text-primary">{{ zodiacResult.fortune.overall }}</div>
            </div>
            <div class="p-3 bg-cream rounded-lg text-center">
              <div class="text-xs text-gray-500">五行属性</div>
              <div class="text-lg font-bold text-primary">{{ zodiacResult.element }}</div>
            </div>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-700 mb-1">性格特点</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="p in zodiacResult.personality" :key="p" class="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">{{ p }}</span>
            </div>
          </div>
          <div>
            <div class="text-sm font-medium text-gray-700 mb-1">速配生肖</div>
            <div class="flex flex-wrap gap-2">
              <span v-for="c in zodiacResult.compatible" :key="c" class="px-3 py-1 bg-gold/10 text-gold text-sm rounded-full">{{ c }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loveResult" class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-3">姻缘测试</h3>
        <div class="text-center mb-4">
          <div class="text-5xl font-bold text-primary">{{ loveResult.index }}</div>
          <div class="text-sm text-gray-500">缘分指数</div>
          <div class="mt-1 font-medium" :class="getLevelClass(loveResult.level)">{{ getLevelText(loveResult.level) }}</div>
        </div>
        <p class="text-gray-600 mb-3">{{ loveResult.description }}</p>
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div class="p-3 bg-cream rounded-lg text-center">
            <div class="text-xs text-gray-500">相似度</div>
            <div class="font-bold text-primary">{{ loveResult.similarity }}%</div>
          </div>
          <div class="p-3 bg-cream rounded-lg text-center">
            <div class="text-xs text-gray-500">互补度</div>
            <div class="font-bold text-primary">{{ loveResult.complementary }}%</div>
          </div>
        </div>
      </div>

      <div v-if="nameResult" class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-3">姓名分析</h3>
        <div class="space-y-3">
          <div class="grid grid-cols-5 gap-2 text-center">
            <div class="p-2 bg-cream rounded">
              <div class="text-xs text-gray-500">天格</div>
              <div class="font-bold text-primary">{{ nameResult.fiveGrid.heavenGrid }}</div>
            </div>
            <div class="p-2 bg-cream rounded">
              <div class="text-xs text-gray-500">人格</div>
              <div class="font-bold text-primary">{{ nameResult.fiveGrid.humanGrid }}</div>
            </div>
            <div class="p-2 bg-cream rounded">
              <div class="text-xs text-gray-500">地格</div>
              <div class="font-bold text-primary">{{ nameResult.fiveGrid.earthGrid }}</div>
            </div>
            <div class="p-2 bg-cream rounded">
              <div class="text-xs text-gray-500">外格</div>
              <div class="font-bold text-primary">{{ nameResult.fiveGrid.outerGrid }}</div>
            </div>
            <div class="p-2 bg-cream rounded">
              <div class="text-xs text-gray-500">总格</div>
              <div class="font-bold text-primary">{{ nameResult.fiveGrid.totalGrid }}</div>
            </div>
          </div>
          <p class="text-gray-600">{{ nameResult.fortune }}</p>
          <p class="text-sm text-gray-500">{{ nameResult.suggestion }}</p>
        </div>
      </div>

      <div v-if="numberResult" class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-3">号码分析</h3>
        <div class="text-center mb-4">
          <div class="text-4xl font-bold" :class="getNumberLevelClass(numberResult.level)">{{ numberResult.index }}</div>
          <div class="text-sm text-gray-500">吉凶指数</div>
          <div class="mt-1 font-medium">{{ getNumberLevelText(numberResult.level) }}</div>
        </div>
        <div class="space-y-2">
          <p class="text-gray-600">{{ numberResult.meaning }}</p>
          <p class="text-sm text-gray-500">{{ numberResult.description }}</p>
          <p class="text-sm text-primary font-medium">{{ numberResult.advice }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getZodiacFortune, calculateLoveMatch, analyzeName, analyzeNumber } from '@/api/fun'
import PageHeader from '@/components/PageHeader.vue'
import LoadingState from '@/components/LoadingState.vue'
import type { ZodiacFortune, LoveMatchResult, NameAnalysis, NumberAnalysis } from '@/types'

const route = useRoute()
const type = route.params.type as string

const pageTitle = computed(() => {
  const titles: Record<string, string> = {
    zodiac: '生肖速测', love: '简易姻缘', name: '姓名测试', number: '号码吉凶',
  }
  return titles[type] || '趣味测算'
})

const loading = ref(false)
const zodiacResult = ref<ZodiacFortune | null>(null)
const loveResult = ref<LoveMatchResult | null>(null)
const nameResult = ref<NameAnalysis | null>(null)
const numberResult = ref<NumberAnalysis | null>(null)

const zodiacForm = reactive({ zodiac: 'rat' })
const loveForm = reactive({ name1: '', name2: '' })
const nameForm = reactive({ name: '' })
const numberForm = reactive({ number: '', type: 'phone' })

const zodiacList = [
  { value: 'rat', label: '鼠', icon: '🐭' },
  { value: 'ox', label: '牛', icon: '🐮' },
  { value: 'tiger', label: '虎', icon: '🐯' },
  { value: 'rabbit', label: '兔', icon: '🐰' },
  { value: 'dragon', label: '龙', icon: '🐲' },
  { value: 'snake', label: '蛇', icon: '🐍' },
  { value: 'horse', label: '马', icon: '🐴' },
  { value: 'goat', label: '羊', icon: '🐑' },
  { value: 'monkey', label: '猴', icon: '🐵' },
  { value: 'rooster', label: '鸡', icon: '🐔' },
  { value: 'dog', label: '狗', icon: '🐶' },
  { value: 'pig', label: '猪', icon: '🐷' },
]

function calculateZodiac() {
  loading.value = true
  zodiacResult.value = null
  setTimeout(() => {
    zodiacResult.value = getZodiacFortune(zodiacForm.zodiac)
    loading.value = false
  }, 300)
}

function calculateLove() {
  if (!loveForm.name1 || !loveForm.name2) return
  loading.value = true
  loveResult.value = null
  setTimeout(() => {
    loveResult.value = calculateLoveMatch({ name1: loveForm.name1, name2: loveForm.name2 })
    loading.value = false
  }, 300)
}

function calculateName() {
  if (!nameForm.name) return
  loading.value = true
  nameResult.value = null
  setTimeout(() => {
    nameResult.value = analyzeName(nameForm.name)
    loading.value = false
  }, 300)
}

function calculateNumber() {
  if (!numberForm.number) return
  loading.value = true
  numberResult.value = null
  setTimeout(() => {
    numberResult.value = analyzeNumber(numberForm.number, numberForm.type)
    loading.value = false
  }, 300)
}

function getLevelClass(level: string) {
  const classes: Record<string, string> = {
    perfect: 'text-red-500', excellent: 'text-green-600', good: 'text-blue-600',
    average: 'text-yellow-600', poor: 'text-gray-500',
  }
  return classes[level] || ''
}

function getLevelText(level: string) {
  const texts: Record<string, string> = {
    perfect: '天生一对', excellent: '非常般配', good: '比较合适',
    average: '普通一般', poor: '需要磨合',
  }
  return texts[level] || ''
}

function getNumberLevelClass(level: string) {
  if (level === 'auspicious') return 'text-green-600'
  if (level === 'inauspicious') return 'text-red-500'
  return 'text-yellow-600'
}

function getNumberLevelText(level: string) {
  if (level === 'auspicious') return '大吉'
  if (level === 'inauspicious') return '大凶'
  return '平'
}
</script>
