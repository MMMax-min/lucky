<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="relative mb-4">
      <div class="text-6xl animate-bounce-in">🔮</div>
      <div class="absolute -top-2 -right-2 text-2xl animate-wiggle">✨</div>
    </div>
    <p class="text-gray-600 font-medium text-lg">{{ message }}</p>
    <p class="text-gray-400 text-sm mt-2">请稍候...</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  message?: string
}>(), {
  message: '算命中...'
})
</script>
