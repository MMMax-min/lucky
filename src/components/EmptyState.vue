<template>
  <div class="flex flex-col items-center justify-center py-12">
    <div class="text-7xl mb-4 animate-float">🌙</div>
    <p class="text-gray-500 mb-4 text-lg">{{ message }}</p>
    <button
      v-if="actionText"
      @click="$emit('action')"
      class="btn-primary flex items-center gap-2"
    >
      <span class="animate-wiggle">✨</span>
      {{ actionText }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message?: string
  actionText?: string
}>()

defineEmits<{
  action: []
}>()
</script>
