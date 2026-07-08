<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="免责声明" :show-back="true" />

    <div class="mt-6 space-y-6">
      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">法律声明</h3>
        <div class="prose prose-sm text-gray-600 space-y-3">
          <p>本站提供的所有命理分析、星座运势、吉日查询等内容仅供参考娱乐，不构成任何实际建议。</p>
          <p>本站内容基于中国传统文化和民俗，不具有科学依据，请理性看待。</p>
          <p>本站不收集任何个人身份信息，所有数据仅存储在您的浏览器本地。</p>
        </div>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">使用条款</h3>
        <div class="prose prose-sm text-gray-600 space-y-3">
          <p>1. 使用本站即表示您同意以上声明。</p>
          <p>2. 本站内容受版权保护，未经授权不得转载。</p>
          <p>3. 本站保留随时修改内容的权利。</p>
        </div>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">隐私政策</h3>
        <div class="prose prose-sm text-gray-600 space-y-3">
          <p>本站不收集任何个人信息。</p>
          <p>所有数据（历史记录、收藏等）仅存储在您的浏览器本地。</p>
          <p>您可以随时在设置中清除所有本地数据。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
</script>
