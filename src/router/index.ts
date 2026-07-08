import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: '首页 - 运势测试', showHeader: true, showFooter: true },
  },
  {
    path: '/wuxing',
    name: 'WuXing',
    component: () => import('@/pages/WuXingPage.vue'),
    meta: { title: '五行分析 - 运势测试', showBack: true },
  },
  {
    path: '/constellation',
    name: 'Constellation',
    component: () => import('@/pages/ConstellationPage.vue'),
    meta: { title: '星座运势 - 运势测试', showHeader: true, showFooter: true },
  },
  {
    path: '/constellation/:id',
    name: 'ConstellationDetail',
    component: () => import('@/pages/ConstellationDetailPage.vue'),
    meta: { title: '星座详情 - 运势测试', showBack: true },
  },
  {
    path: '/auspicious-day',
    name: 'AuspiciousDay',
    component: () => import('@/pages/AuspiciousDayPage.vue'),
    meta: { title: '吉日查询 - 运势测试', showBack: true },
  },
  {
    path: '/fun',
    name: 'Fun',
    component: () => import('@/pages/FunPage.vue'),
    meta: { title: '趣味测算 - 运势测试', showHeader: true, showFooter: true },
  },
  {
    path: '/fun/:type',
    name: 'FunDetail',
    component: () => import('@/pages/FunDetailPage.vue'),
    meta: { title: '趣味测算详情 - 运势测试', showBack: true },
  },
  {
    path: '/tools',
    name: 'Tools',
    component: () => import('@/pages/ToolsPage.vue'),
    meta: { title: '择吉工具 - 运势测试', showBack: true },
  },
  {
    path: '/wuxing-guide',
    name: 'WuXingGuide',
    component: () => import('@/pages/WuXingGuidePage.vue'),
    meta: { title: '五行化解 - 运势测试', showBack: true },
  },
  {
    path: '/destiny-chart',
    name: 'DestinyChart',
    component: () => import('@/pages/DestinyChartPage.vue'),
    meta: { title: '可视化命盘 - 运势测试', showBack: true },
  },
  {
    path: '/export',
    name: 'Export',
    component: () => import('@/pages/ExportPage.vue'),
    meta: { title: '结果导出 - 运势测试', showBack: true },
  },
  {
    path: '/disclaimer',
    name: 'Disclaimer',
    component: () => import('@/pages/DisclaimerPage.vue'),
    meta: { title: '免责声明 - 运势测试', showBack: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/pages/AboutPage.vue'),
    meta: { title: '关于我们 - 运势测试', showBack: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: '页面未找到 - 运势测试' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

router.beforeEach((to, _from, next) => {
  document.title = (to.meta.title as string) || '运势测试网站'
  next()
})

export default router
