<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="结果导出" :show-back="true" />

    <div class="mt-6 space-y-6">
      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">选择导出格式</h3>
        <div class="grid grid-cols-2 gap-3">
          <button @click="exportImage" class="card text-center hover:shadow-chinese transition-all">
            <div class="text-2xl mb-2">🖼️</div>
            <div class="font-medium text-gray-800">导出图片</div>
            <div class="text-xs text-gray-500">PNG/JPEG格式</div>
          </button>
          <button @click="exportPDF" class="card text-center hover:shadow-chinese transition-all">
            <div class="text-2xl mb-2">📄</div>
            <div class="font-medium text-gray-800">导出PDF</div>
            <div class="text-xs text-gray-500">完整报告</div>
          </button>
        </div>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">社交分享</h3>
        <div class="grid grid-cols-4 gap-3">
          <button
            v-for="platform in platforms"
            :key="platform.name"
            @click="share(platform.name)"
            class="card text-center hover:shadow-chinese transition-all"
          >
            <div class="text-2xl mb-1">{{ platform.icon }}</div>
            <div class="text-xs text-gray-600">{{ platform.label }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'

const platforms = [
  { name: 'wechat', icon: '💬', label: '微信' },
  { name: 'weibo', icon: '📱', label: '微博' },
  { name: 'qq', icon: '🐧', label: 'QQ' },
  { name: 'link', icon: '🔗', label: '复制链接' },
]

function exportImage() {
  alert('图片导出功能开发中...')
}

function exportPDF() {
  alert('PDF导出功能开发中...')
}

function share(platform: string) {
  if (platform === 'link') {
    navigator.clipboard.writeText(window.location.href)
    alert('链接已复制到剪贴板')
  } else {
    alert(`${platform}分享功能开发中...`)
  }
}
</script>
