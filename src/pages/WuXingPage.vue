<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="五行分析" :show-back="true" />

    <div class="mt-6">
      <!-- 输入表单 -->
      <div class="card chinese-border mb-6">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <span class="text-2xl animate-wiggle">🔮</span>
          输入你的生辰八字
        </h2>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">出生日期</label>
            <input
              v-model="form.date"
              type="date"
              class="input-field"
              :min="'1900-01-01'"
              :max="'2100-12-31'"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">出生时辰</label>
            <select v-model="form.hour" class="input-field">
              <option v-for="(h, i) in hours" :key="i" :value="i">{{ h }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">性别（可选）</label>
            <div class="flex gap-3">
              <button
                v-for="g in genders"
                :key="g.value"
                @click="form.gender = g.value"
                class="flex-1 py-3 rounded-xl border-2 transition-all duration-300 font-medium"
                :class="form.gender === g.value ? 'border-primary bg-primary/10 text-primary shadow-chinese' : 'border-gray-200 hover:border-primary/50'"
              >
                {{ g.icon }} {{ g.label }}
              </button>
            </div>
          </div>

          <button @click="calculate" class="btn-primary w-full text-lg py-4" :disabled="loading">
            <span v-if="loading" class="flex items-center justify-center gap-2">
              <span class="animate-spin">⏳</span> 算命中...
            </span>
            <span v-else class="flex items-center justify-center gap-2">
              <span class="animate-wiggle">✨</span> 开始测算
            </span>
          </button>
        </div>
      </div>

      <!-- 加载状态 -->
      <LoadingState v-if="loading" message="正在算命，请稍候..." />

      <!-- 结果展示 -->
      <div v-if="result" class="space-y-6 animate-slide-up">
        <!-- 八字信息 -->
        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-xl">📜</span> 你的八字
          </h3>
          <div class="grid grid-cols-4 gap-2 text-center">
            <div v-for="(pillar, key) in result.bazi" :key="key" class="p-3 bg-gradient-to-br from-cream to-white rounded-xl border border-gold/20">
              <div class="text-xs text-gray-500 mb-1">{{ pillarLabels[key] }}</div>
              <div class="font-serif font-bold text-primary text-xl">{{ pillar.heavenlyStem }}</div>
              <div class="font-serif font-bold text-primary text-xl">{{ pillar.earthlyBranch }}</div>
            </div>
          </div>
          <div class="mt-4 text-center">
            <span class="inline-block px-4 py-2 bg-gold/10 rounded-full text-sm font-medium text-gold-dark">
              🎋 纳音：{{ result.nayin }}
            </span>
          </div>
        </div>

        <!-- 五行分布 -->
        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-xl">☯</span> 五行占比
          </h3>
          <div class="space-y-4">
            <div v-for="(element, key) in elementNames" :key="key" class="group">
              <div class="flex items-center gap-3 mb-1">
                <span class="w-10 text-center font-bold text-lg" :style="{ color: elementColors[key] }">{{ element }}</span>
                <div class="flex-1 h-8 bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    class="h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                    :style="{
                      width: result.distribution[key] + '%',
                      backgroundColor: elementColors[key]
                    }"
                  >
                    <div class="absolute inset-0 shimmer"></div>
                  </div>
                </div>
                <span class="w-14 text-right text-sm font-bold" :style="{ color: elementColors[key] }">{{ result.distribution[key] }}%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 喜用神分析 -->
        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-xl">🎯</span> 命理分析
          </h3>
          <div class="space-y-3">
            <div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-green-600">✅</span>
                <span class="text-sm text-green-700 font-bold">喜用神</span>
              </div>
              <span class="text-green-800 font-medium">{{ result.favorableElement.join('、') }}</span>
            </div>
            <div v-if="result.unfavorableElement.length" class="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-red-600">⚠️</span>
                <span class="text-sm text-red-700 font-bold">忌神</span>
              </div>
              <span class="text-red-800 font-medium">{{ result.unfavorableElement.join('、') }}</span>
            </div>
            <div v-if="result.missing.length" class="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-yellow-600">💡</span>
                <span class="text-sm text-yellow-700 font-bold">缺啥补啥</span>
              </div>
              <span class="text-yellow-800 font-medium">你缺 {{ result.missing.join('、') }}，记得补一补哦~</span>
            </div>
          </div>
        </div>

        <!-- 化解建议 -->
        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <span class="text-xl">✨</span> 开运指南
          </h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
              <span class="text-2xl">🎨</span>
              <div>
                <div class="text-xs text-gray-500">幸运颜色</div>
                <div class="font-medium text-gray-800">{{ result.remedies.colors.join('、') }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
              <span class="text-2xl">🧭</span>
              <div>
                <div class="text-xs text-gray-500">吉祥方位</div>
                <div class="font-medium text-gray-800">{{ result.remedies.directions.join('、') }}</div>
              </div>
            </div>
            <div class="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl">
              <span class="text-2xl">🔢</span>
              <div>
                <div class="text-xs text-gray-500">幸运数字</div>
                <div class="font-medium text-gray-800">{{ result.remedies.numbers.join('、') }}</div>
              </div>
            </div>
            <div v-if="result.remedies.industries.length" class="flex items-center gap-3 p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl">
              <span class="text-2xl">💼</span>
              <div>
                <div class="text-xs text-gray-500">适合行业</div>
                <div class="font-medium text-gray-800">{{ result.remedies.industries.join('、') }}</div>
              </div>
            </div>
            <div class="mt-4 p-4 bg-cream/50 rounded-xl">
              <p class="text-gray-600 text-sm leading-relaxed">{{ result.remedies.description }}</p>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-3">
          <button @click="shareResult" class="btn-outline flex-1 flex items-center justify-center gap-2">
            <span>📤</span> 分享给朋友
          </button>
          <button @click="saveResult" class="btn-gold flex-1 flex items-center justify-center gap-2">
            <span>💾</span> 保存记录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { calculateWuXing } from '@/api/wuxing'
import { useUserStore } from '@/stores/user'
import { generateId } from '@/utils/formatters'
import PageHeader from '@/components/PageHeader.vue'
import LoadingState from '@/components/LoadingState.vue'
import type { WuXingResult } from '@/types'

const userStore = useUserStore()

const form = reactive({
  date: '1990-05-15',
  hour: 10,
  gender: '' as 'male' | 'female' | '',
})

const hours = [
  '子时 (23:00-01:00) 🌙', '丑时 (01:00-03:00) 🐂', '寅时 (03:00-05:00) 🐅',
  '卯时 (05:00-07:00) 🐇', '辰时 (07:00-09:00) 🐉', '巳时 (09:00-11:00) 🐍',
  '午时 (11:00-13:00) 🐴', '未时 (13:00-15:00) 🐑', '申时 (15:00-17:00) 🐒',
  '酉时 (17:00-19:00) 🐔', '戌时 (19:00-21:00) 🐕', '亥时 (21:00-23:00) 🐷',
]

const genders = [
  { label: '男', value: 'male' as const, icon: '👨' },
  { label: '女', value: 'female' as const, icon: '👩' },
]

const pillarLabels: Record<string, string> = {
  year: '年柱', month: '月柱', day: '日柱', hour: '时柱',
}

const elementNames: Record<string, string> = {
  metal: '金', wood: '木', water: '水', fire: '火', earth: '土',
}

const elementColors: Record<string, string> = {
  metal: '#FFD700', wood: '#228B22', water: '#4169E1', fire: '#DC143C', earth: '#DAA520',
}

const loading = ref(false)
const result = ref<WuXingResult | null>(null)

function calculate() {
  if (!form.date) return
  loading.value = true
  result.value = null

  setTimeout(() => {
    const [year, month, day] = form.date.split('-').map(Number)
    result.value = calculateWuXing({
      solarDate: { year, month, day },
      hour: form.hour,
      gender: form.gender as 'male' | 'female' || undefined,
    })
    loading.value = false
  }, 800)
}

function saveResult() {
  if (!result.value) return
  userStore.saveHistory({
    id: generateId(),
    type: 'wuxing',
    title: `五行分析 - ${form.date}`,
    input: { ...form },
    result: result.value,
    timestamp: Date.now(),
  })
  alert('✅ 已保存到历史记录')
}

function shareResult() {
  const text = `🔮 我的五行分析结果：喜用神为${result.value?.favorableElement.join('、')}，快来测测你的五行吧！`
  if (navigator.share) {
    navigator.share({ title: '五行分析', text })
  } else {
    navigator.clipboard.writeText(text)
    alert('📋 已复制到剪贴板，快去分享吧~')
  }
}
</script>
