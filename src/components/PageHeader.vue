<template>
  <div class="bg-white/80 backdrop-blur-sm border-b border-gray-100">
    <div class="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <button
          v-if="showBack"
          @click="$router.back()"
          class="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-all duration-300 hover:scale-110 hover:-translate-x-1"
        >
          <span class="text-xl">←</span>
        </button>
        <h1 class="font-serif font-bold text-lg text-gray-800 gradient-text">{{ title }}</h1>
      </div>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  showBack?: boolean
}>()
</script>
