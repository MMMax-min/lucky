<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="可视化命盘" :show-back="true" />

    <div class="mt-6 space-y-6">
      <div class="card chinese-border">
        <h2 class="font-serif font-bold text-lg text-gray-800 mb-4">请输入生辰信息</h2>
        <div class="space-y-3">
          <input v-model="date" type="date" class="input-field" />
          <select v-model="hour" class="input-field">
            <option v-for="(h, i) in hours" :key="i" :value="i">{{ h }}</option>
          </select>
        </div>
        <button @click="generateChart" class="btn-primary w-full mt-4">生成命盘</button>
      </div>

      <div v-if="bazi" class="space-y-6">
        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">四柱八字</h3>
          <div class="grid grid-cols-4 gap-3">
            <div v-for="(pillar, idx) in pillars" :key="idx" class="text-center p-4 bg-cream rounded-xl">
              <div class="text-xs text-gray-500 mb-2">{{ pillarLabels[idx] }}</div>
              <div class="font-serif font-bold text-2xl text-primary">{{ pillar.stem }}</div>
              <div class="font-serif font-bold text-2xl text-primary">{{ pillar.branch }}</div>
            </div>
          </div>
          <div class="mt-4 text-center text-sm text-gray-600">
            纳音：{{ bazi.nayin }} · 生肖：{{ bazi.animal }}
          </div>
        </div>

        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">五行分布</h3>
          <div class="h-64" ref="chartRef"></div>
        </div>

        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">大运时间轴</h3>
          <div class="relative">
            <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-primary/20"></div>
            <div v-for="(d, i) in dayunList" :key="i" class="relative pl-10 pb-6">
              <div class="absolute left-2.5 w-3 h-3 rounded-full bg-primary"></div>
              <div class="text-sm text-gray-500">{{ d.startAge }}-{{ d.endAge }}岁</div>
              <div class="font-medium text-gray-800">{{ d.heavenlyStem }}{{ d.earthlyBranch }} ({{ d.element }})</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { getBaziInfo, getDayun } from '@/api/wuxing'
import PageHeader from '@/components/PageHeader.vue'
import type { BaziInfo, Dayun } from '@/types'

const date = ref('1990-05-15')
const hour = ref(10)
const bazi = ref<BaziInfo | null>(null)
const dayunList = ref<Dayun[]>([])
const chartRef = ref<HTMLElement | null>(null)

const hours = [
  '子时 (23:00-01:00)', '丑时 (01:00-03:00)', '寅时 (03:00-05:00)',
  '卯时 (05:00-07:00)', '辰时 (07:00-09:00)', '巳时 (09:00-11:00)',
  '午时 (11:00-13:00)', '未时 (13:00-15:00)', '申时 (15:00-17:00)',
  '酉时 (17:00-19:00)', '戌时 (19:00-21:00)', '亥时 (21:00-23:00)',
]

const pillarLabels = ['年柱', '月柱', '日柱', '时柱']
const pillars = ref<{ stem: string; branch: string }[]>([])

async function generateChart() {
  const [year, month, day] = date.value.split('-').map(Number)
  bazi.value = getBaziInfo({ year, month, day })
  dayunList.value = getDayun(bazi.value)

  pillars.value = [
    { stem: bazi.value.heavenlyStems[0], branch: bazi.value.earthlyBranchs[0] },
    { stem: bazi.value.heavenlyStems[1], branch: bazi.value.earthlyBranchs[1] },
    { stem: bazi.value.heavenlyStems[2], branch: bazi.value.earthlyBranchs[2] },
    { stem: bazi.value.heavenlyStems[3], branch: bazi.value.earthlyBranchs[3] },
  ]

  await nextTick()
  renderChart()
}

function renderChart() {
  if (!chartRef.value) return

  import('echarts').then((echarts) => {
    const chart = echarts.init(chartRef.value!)
    chart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 10 },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
        label: { show: true, formatter: '{b}: {d}%' },
        data: [
          { value: 20, name: '金', itemStyle: { color: '#FFD700' } },
          { value: 25, name: '木', itemStyle: { color: '#228B22' } },
          { value: 15, name: '水', itemStyle: { color: '#4169E1' } },
          { value: 25, name: '火', itemStyle: { color: '#DC143C' } },
          { value: 15, name: '土', itemStyle: { color: '#DAA520' } },
        ],
      }],
    })
  })
}
</script>
