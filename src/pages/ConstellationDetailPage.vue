<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader :title="constellationInfo?.name || '星座详情'" :show-back="true" />
    <div class="mt-6">
      <div v-if="fortune" class="space-y-6">
        <div class="card chinese-border text-center">
          <div class="text-5xl mb-3">{{ fortune.constellation.symbol }}</div>
          <h2 class="font-serif font-bold text-2xl text-gray-800">{{ fortune.constellation.name }}</h2>
          <p class="text-sm text-gray-500 mt-1">{{ fortune.constellation.dateRange }}</p>
          <p class="text-sm text-gray-600 mt-2">守护星：{{ fortune.constellation.rulingPlanet }}</p>
        </div>

        <div class="card chinese-border">
          <h3 class="font-serif font-bold text-lg text-gray-800 mb-3">今日运势</h3>
          <div class="text-center mb-4">
            <div class="text-5xl font-bold text-primary">{{ fortune.overall }}</div>
            <div class="text-sm text-gray-500">综合评分</div>
          </div>
          <p class="text-gray-600 whitespace-pre-line">{{ fortune.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getConstellationFortune } from '@/api/constellation'
import constellationData from '@/data/constellation.json'
import PageHeader from '@/components/PageHeader.vue'
import type { FortuneResult } from '@/types'

const route = useRoute()
const id = route.params.id as string
const constellationInfo = constellationData.constellations[id as keyof typeof constellationData.constellations]
const fortune = ref<FortuneResult | null>(null)

onMounted(() => {
  fortune.value = getConstellationFortune(id as any)
})
</script>
