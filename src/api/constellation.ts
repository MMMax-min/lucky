import constellationData from '@/data/constellation.json'
import fortuneTemplates from '@/data/fortune-templates.json'
import type { Constellation, FortuneResult, MatchResult } from '@/types'

const constellations = constellationData.constellations

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function getDateSeed(dateStr: string): number {
  let hash = 0
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function pickRandom<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

export function getConstellationFortune(
  constellation: Constellation,
  date?: string,
  type: 'daily' | 'weekly' | 'monthly' = 'daily'
): FortuneResult {
  const info = constellations[constellation]
  const dateStr = date || new Date().toISOString().split('T')[0]
  const seed = getDateSeed(dateStr + constellation + type)
  const rand = seededRandom(seed)

  const baseScore = 50 + Math.floor(rand() * 40)
  const love = Math.min(100, Math.max(1, baseScore + Math.floor(rand() * 30 - 15)))
  const career = Math.min(100, Math.max(1, baseScore + Math.floor(rand() * 30 - 15)))
  const wealth = Math.min(100, Math.max(1, baseScore + Math.floor(rand() * 30 - 15)))
  const health = Math.min(100, Math.max(1, baseScore + Math.floor(rand() * 30 - 15)))
  const social = Math.min(100, Math.max(1, baseScore + Math.floor(rand() * 30 - 15)))
  const overall = Math.round((love + career + wealth + health + social) / 5)

  const templates = type === 'daily' ? fortuneTemplates.dailyTemplates
    : type === 'weekly' ? fortuneTemplates.weeklyTemplates
    : fortuneTemplates.monthlyTemplates

  const loveDesc = pickRandom(templates.love, rand)
  const careerDesc = pickRandom(templates.career, rand)
  const wealthDesc = pickRandom(templates.wealth, rand)

  const luckyColors = info.luckyColors
  const luckyNumbers = info.luckyNumbers

  return {
    constellation: {
      name: info.name,
      dateRange: info.dateRange,
      element: info.element,
      rulingPlanet: info.rulingPlanet,
      symbol: info.symbol,
    },
    overall,
    dimensions: { love, career, wealth, health, social },
    description: `${loveDesc}\n${careerDesc}\n${wealthDesc}`,
    lucky: {
      color: pickRandom(luckyColors, rand),
      number: pickRandom(luckyNumbers, rand),
      direction: ['东方', '西方', '南方', '北方', '中央'][Math.floor(rand() * 5)],
      gemstone: ['红玛瑙', '紫水晶', '黑曜石', '绿幽灵', '黄玉'][Math.floor(rand() * 5)],
    },
    compatible: info.compatible.map(c => constellations[c as keyof typeof constellations]?.name || c),
    caution: `今天${info.name}需要注意情绪管理，避免冲动行事。`,
    tips: [
      `与${info.compatible[0] ? constellations[info.compatible[0] as keyof typeof constellations]?.name : '处女座'}互动会有好运`,
      '保持积极心态',
      '把握机会展现自己',
    ],
  }
}

export function getConstellationMatch(c1: Constellation, c2: Constellation): MatchResult {
  const info1 = constellations[c1]
  const info2 = constellations[c2]

  const isCompatible = info1.compatible.includes(c2)
  const sameElement = info1.element === info2.element
  const baseIndex = isCompatible ? 80 : sameElement ? 70 : 50
  const index = Math.min(100, Math.max(1, baseIndex + Math.floor(Math.random() * 20)))

  let level: MatchResult['level'] = 'average'
  if (index >= 90) level = 'excellent'
  else if (index >= 75) level = 'good'
  else if (index < 40) level = 'poor'

  return {
    index,
    level,
    description: `${info1.name}与${info2.name}的配对${level === 'excellent' ? '非常完美' : level === 'good' ? '比较合适' : level === 'average' ? '普通一般' : '需要磨合'}。`,
    strengths: isCompatible ? ['性格互补', '价值观相近'] : sameElement ? ['思维方式相似', '容易理解对方'] : ['各有特色', '互相吸引'],
    weaknesses: isCompatible ? [] : sameElement ? ['可能缺乏激情'] : ['性格差异大', '沟通需要努力'],
    advice: [
      '多沟通交流',
      '互相理解和包容',
      '珍惜彼此的差异',
    ],
  }
}
