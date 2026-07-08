<template>
  <div class="page-container pb-20 md:pb-6">
    <PageHeader title="关于我们" :show-back="true" />

    <div class="mt-6 space-y-6">
      <div class="card chinese-border text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center">
          <span class="text-gold text-3xl font-bold">运</span>
        </div>
        <h2 class="font-serif font-bold text-2xl text-gray-800 mb-2">运势测试</h2>
        <p class="text-gray-500">v1.0.0</p>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">项目介绍</h3>
        <div class="text-sm text-gray-600 space-y-2">
          <p>运势测试是一个以中国传统文化为核心的运势分析平台。</p>
          <p>我们致力于让传统命理文化更易于理解和传播，通过现代化的交互设计，为用户提供专业的命理服务。</p>
          <p>所有运算在浏览器端完成，保护您的隐私安全。</p>
        </div>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">功能特色</h3>
        <div class="space-y-2 text-sm text-gray-600">
          <p>☯ 五行分析 - 八字命理、五行强弱、喜用神</p>
          <p>⭐ 星座运势 - 每日/每周/每月运势预测</p>
          <p>📅 吉日查询 - 黄历宜忌、办事择吉</p>
          <p>🎯 趣味测算 - 生肖/姻缘/姓名/号码</p>
          <p>☯ 可视化命盘 - 八字排盘、大运时间轴</p>
        </div>
      </div>

      <div class="card chinese-border">
        <h3 class="font-serif font-bold text-lg text-gray-800 mb-4">联系我们</h3>
        <div class="text-sm text-gray-600">
          <p>如有问题或建议，请通过以下方式联系我们：</p>
          <p class="mt-2 text-primary">feedback@fortune-test.com</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PageHeader from '@/components/PageHeader.vue'
</script>
