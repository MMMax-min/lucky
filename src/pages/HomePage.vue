<template>
  <div class="page-container pb-20 md:pb-6">
    <!-- Hero区域 - 不规则布局 -->
    <section class="mb-10 relative">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 p-8 md:p-12">
        <!-- 装饰 -->
        <div class="absolute -top-8 -right-8 w-40 h-40 bg-gradient-to-br from-primary/10 to-gold/10 rounded-full blur-3xl"></div>
        <div class="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-gold/10 to-primary/10 rounded-full blur-2xl"></div>
        
        <!-- 浮动元素 -->
        <div class="absolute top-6 right-8 text-5xl opacity-10 animate-float" style="animation-delay: 0s;">☯</div>
        <div class="absolute top-20 right-24 text-3xl opacity-10 animate-float" style="animation-delay: 1s;">✨</div>
        <div class="absolute bottom-8 right-12 text-4xl opacity-10 animate-float" style="animation-delay: 2s;">🌙</div>
        
        <div class="relative z-10">
          <!-- 标题 -->
          <div class="mb-6">
            <h1 class="text-4xl md:text-5xl font-serif font-bold text-gray-800 leading-tight mb-3">
              今天<span class="gradient-text">适合干啥</span>？
            </h1>
            <!-- 今日宜忌 - 随机展示 -->
            <div class="flex flex-wrap gap-2">
              <span v-for="(item, index) in randomFortune" :key="index" 
                class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
                :class="item.class"
              >
                <span>{{ item.icon }}</span>
                <span>{{ item.text }}</span>
              </span>
            </div>
          </div>
          
          <!-- 快捷入口 -->
          <div class="flex flex-wrap gap-3">
            <router-link to="/wuxing" class="group inline-flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span class="text-xl group-hover:scale-125 transition-transform">☯</span>
              <span class="font-medium text-gray-700">五行分析</span>
              <span class="text-xs text-gray-400">→</span>
            </router-link>
            <router-link to="/constellation" class="group inline-flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span class="text-xl group-hover:scale-125 transition-transform">⭐</span>
              <span class="font-medium text-gray-700">星座运势</span>
              <span class="text-xs text-gray-400">→</span>
            </router-link>
            <router-link to="/auspicious-day" class="group inline-flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
              <span class="text-xl group-hover:scale-125 transition-transform">📅</span>
              <span class="font-medium text-gray-700">挑个好日子</span>
              <span class="text-xs text-gray-400">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 今日运势 - 卡片式 -->
    <section class="mb-10">
      <div class="flex items-center gap-2 mb-5">
        <span class="text-2xl">🌤️</span>
        <h2 class="text-xl font-bold text-gray-800">今天咋样</h2>
        <span class="text-sm text-gray-400 ml-auto">{{ todayDate }}</span>
      </div>
      
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(item, index) in dailyItems" :key="item.label" 
            class="relative p-4 rounded-2xl transition-all duration-300 cursor-default group"
            :class="item.bgClass"
          >
            <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">{{ item.icon }}</div>
            <div class="text-xs text-gray-500 mb-1">{{ item.label }}</div>
            <div class="font-bold" :class="item.textColor">{{ item.value }}</div>
            <!-- 小装饰 -->
            <div class="absolute top-2 right-2 text-xs opacity-30">{{ item.deco }}</div>
          </div>
        </div>
        
        <!-- 底部小贴士 -->
        <div class="mt-4 pt-4 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-400">💡 小贴士：运气不够，努力来凑</p>
        </div>
      </div>
    </section>

    <!-- 功能模块 - 不规则网格 -->
    <section class="mb-10">
      <div class="flex items-center gap-2 mb-5">
        <span class="text-2xl">🎯</span>
        <h2 class="text-xl font-bold text-gray-800">想测点啥</h2>
      </div>
      
      <div class="grid grid-cols-2 gap-4">
        <!-- 大卡片 - 五行分析 -->
        <router-link to="/wuxing" class="col-span-2 md:col-span-1 group relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 to-rose-600 p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full"></div>
          <div class="absolute bottom-4 right-6 text-6xl opacity-20 group-hover:opacity-30 transition-opacity group-hover:rotate-12 duration-500">☯</div>
          <div class="relative z-10">
            <span class="text-4xl mb-3 block">🔮</span>
            <h3 class="font-bold text-xl mb-1">五行分析</h3>
            <p class="text-white/70 text-sm">看看你五行缺啥</p>
          </div>
        </router-link>
        
        <!-- 小卡片 - 星座 -->
        <router-link to="/constellation" class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div class="absolute top-4 right-4 text-4xl opacity-30 group-hover:scale-125 transition-transform">⭐</div>
          <div class="relative z-10">
            <span class="text-3xl mb-2 block">✨</span>
            <h3 class="font-bold text-lg mb-1">星座运势</h3>
            <p class="text-white/70 text-xs">今天适合表白吗</p>
          </div>
        </router-link>
        
        <!-- 小卡片 - 吉日 -->
        <router-link to="/auspicious-day" class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-400 to-teal-500 p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div class="absolute top-4 right-4 text-4xl opacity-30 group-hover:scale-125 transition-transform">📅</div>
          <div class="relative z-10">
            <span class="text-3xl mb-2 block">📆</span>
            <h3 class="font-bold text-lg mb-1">吉日查询</h3>
            <p class="text-white/70 text-xs">啥时候办事靠谱</p>
          </div>
        </router-link>
        
        <!-- 小卡片 - 趣味测算 -->
        <router-link to="/fun" class="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-400 to-violet-500 p-6 text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div class="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 rounded-full"></div>
          <div class="absolute top-4 right-4 text-4xl opacity-30 group-hover:scale-125 transition-transform">🎯</div>
          <div class="relative z-10">
            <span class="text-3xl mb-2 block">🎲</span>
            <h3 class="font-bold text-lg mb-1">趣味测算</h3>
            <p class="text-white/70 text-xs">来点好玩的</p>
          </div>
        </router-link>
      </div>
    </section>

    <!-- 热门测算 - 列表式 -->
    <section class="mb-10">
      <div class="flex items-center gap-2 mb-5">
        <span class="text-2xl">🔥</span>
        <h2 class="text-xl font-bold text-gray-800">大家都在测</h2>
      </div>
      
      <div class="space-y-3">
        <router-link
          v-for="(test, index) in hotTests"
          :key="test.path"
          :to="test.path"
          class="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 group"
        >
          <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-2xl group-hover:scale-110 transition-transform" :class="test.bgClass">
            {{ test.icon }}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-gray-800 group-hover:text-primary transition-colors">{{ test.title }}</h3>
            <p class="text-xs text-gray-500 truncate">{{ test.desc }}</p>
          </div>
          <div class="text-gray-300 group-hover:text-primary group-hover:translate-x-1 transition-all">
            →
          </div>
        </router-link>
      </div>
    </section>

    <!-- 底部语录 -->
    <section class="text-center py-6">
      <div class="inline-block px-6 py-3 bg-gradient-to-r from-primary/5 to-gold/5 rounded-full">
        <p class="text-sm text-gray-500">
          <span class="inline-block animate-wiggle">🌙</span>
          命里有时终须有，命里无时莫强求
        </p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'

const todayDate = computed(() => {
  const d = new Date()
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${d.getMonth() + 1}月${d.getDate()}日 周${weekdays[d.getDay()]}`
})

// 今日宜忌选项池
const fortunePool = [
  { icon: '☕', text: '喝杯咖啡', class: 'bg-amber-100 text-amber-700' },
  { icon: '📚', text: '看会儿书', class: 'bg-blue-100 text-blue-700' },
  { icon: '🎵', text: '听首好歌', class: 'bg-purple-100 text-purple-700' },
  { icon: '🍜', text: '吃顿好的', class: 'bg-orange-100 text-orange-700' },
  { icon: '🚶', text: '出去走走', class: 'bg-green-100 text-green-700' },
  { icon: '💤', text: '早点睡觉', class: 'bg-indigo-100 text-indigo-700' },
  { icon: '🎮', text: '打把游戏', class: 'bg-pink-100 text-pink-700' },
  { icon: '📺', text: '追个剧', class: 'bg-red-100 text-red-700' },
  { icon: '🛒', text: '买点东西', class: 'bg-emerald-100 text-emerald-700' },
  { icon: '🧘', text: '冥想一下', class: 'bg-cyan-100 text-cyan-700' },
  { icon: '📝', text: '写点东西', class: 'bg-violet-100 text-violet-700' },
  { icon: '🌱', text: '浇浇花', class: 'bg-lime-100 text-lime-700' },
  { icon: '📞', text: '联系老友', class: 'bg-rose-100 text-rose-700' },
  { icon: '🎬', text: '看个电影', class: 'bg-fuchsia-100 text-fuchsia-700' },
  { icon: '🧹', text: '收拾房间', class: 'bg-teal-100 text-teal-700' },
  { icon: '🍜', text: '做个饭', class: 'bg-yellow-100 text-yellow-700' },
]

// 随机选4个展示
const randomFortune = ref<typeof fortunePool>([])

function shuffleFortune() {
  const shuffled = [...fortunePool].sort(() => Math.random() - 0.5)
  randomFortune.value = shuffled.slice(0, 4)
}

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  shuffleFortune()
  timer = setInterval(shuffleFortune, 10000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
})

const dailyItems = [
  { icon: '💕', label: '爱情', value: '桃花朵朵', bgClass: 'bg-pink-50', textColor: 'text-pink-600', deco: '🌸' },
  { icon: '💼', label: '事业', value: '稳中有升', bgClass: 'bg-blue-50', textColor: 'text-blue-600', deco: '📈' },
  { icon: '💰', label: '财运', value: '小有收获', bgClass: 'bg-amber-50', textColor: 'text-amber-600', deco: '💵' },
  { icon: '🏃', label: '健康', value: '活力满满', bgClass: 'bg-green-50', textColor: 'text-green-600', deco: '💪' },
]

const hotTests = [
  { title: '五行分析', desc: '输入生辰八字，看看你五行缺啥', path: '/wuxing', icon: '☯', bgClass: 'bg-red-50 text-red-600' },
  { title: '今日星座运势', desc: '今天适合表白吗？', path: '/constellation', icon: '⭐', bgClass: 'bg-amber-50 text-amber-600' },
  { title: '结婚吉日', desc: '选个好日子，幸福一辈子', path: '/auspicious-day', icon: '💍', bgClass: 'bg-pink-50 text-pink-600' },
  { title: '生肖速测', desc: '看看你属啥命', path: '/fun', icon: '🐲', bgClass: 'bg-orange-50 text-orange-600' },
]
</script>
