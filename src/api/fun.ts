import fortuneTemplates from '@/data/fortune-templates.json'
import type { ZodiacFortune, LoveMatchResult, NameAnalysis, NumberAnalysis } from '@/types'

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

function getDateSeed(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash |= 0
  }
  return Math.abs(hash)
}

function pickRandom<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

export function getZodiacFortune(zodiac: string): ZodiacFortune {
  const templates = fortuneTemplates.zodiacFortunes as Record<string, any>
  const data = templates[zodiac] || templates.rat

  const seed = getDateSeed(zodiac + new Date().toISOString().split('T')[0])
  const rand = seededRandom(seed)

  return {
    zodiac,
    element: ['金', '木', '水', '火', '土'][Math.floor(rand() * 5)],
    personality: data.personality,
    fortune: {
      overall: Math.floor(rand() * 40) + 60,
      love: Math.floor(rand() * 40) + 60,
      career: Math.floor(rand() * 40) + 60,
      wealth: Math.floor(rand() * 40) + 60,
    },
    description: data.description,
    compatible: data.compatible,
    incompatible: data.incompatible,
  }
}

export function calculateLoveMatch(names: { name1: string; name2: string }): LoveMatchResult {
  const seed = getDateSeed(names.name1 + names.name2)
  const rand = seededRandom(seed)

  const index = Math.floor(rand() * 40) + 60
  let level: LoveMatchResult['level'] = 'good'
  if (index >= 90) level = 'perfect'
  else if (index >= 80) level = 'excellent'
  else if (index >= 60) level = 'good'
  else if (index >= 40) level = 'average'
  else level = 'poor'

  const descriptions: Record<string, string> = {
    perfect: '你们是天生一对，缘分天注定！',
    excellent: '你们非常般配，感情深厚。',
    good: '你们比较合适，感情稳定。',
    average: '你们需要更多了解和磨合。',
    poor: '你们的性格差异较大，需要努力。',
  }

  return {
    index,
    level,
    description: descriptions[level],
    similarity: Math.floor(rand() * 30) + 40,
    complementary: Math.floor(rand() * 30) + 40,
    advice: [
      '多沟通交流',
      '互相理解和包容',
      '珍惜彼此的缘分',
    ],
  }
}

export function analyzeName(name: string): NameAnalysis {
  const seed = getDateSeed(name)
  const rand = seededRandom(seed)

  const getElement = (num: number): string => {
    if (num % 10 <= 2) return '木'
    if (num % 10 <= 4) return '火'
    if (num % 10 <= 6) return '土'
    if (num % 10 <= 8) return '金'
    return '水'
  }

  const calculateGrid = (n: string, factor: number): number => {
    let sum = 0
    for (let i = 0; i < n.length; i++) {
      sum += n.charCodeAt(i) * factor
    }
    return sum % 100
  }

  const heavenGrid = calculateGrid(name, 1)
  const humanGrid = calculateGrid(name, 2)
  const earthGrid = calculateGrid(name, 3)
  const outerGrid = calculateGrid(name, 4)
  const totalGrid = heavenGrid + humanGrid + earthGrid

  return {
    name,
    fiveGrid: { heavenGrid, humanGrid, earthGrid, outerGrid, totalGrid },
    elements: [getElement(heavenGrid), getElement(humanGrid), getElement(earthGrid)],
    personality: ['聪明机智', '善于思考', '有创造力'][Math.floor(rand() * 3)] ? ['聪明', '有才华', '性格独特'] : ['稳重', '踏实', '可靠'],
    fortune: `姓名${name}的五格数理分析显示，您具有良好的发展潜力。`,
    suggestion: '建议多学习新知识，提升自己的能力。',
  }
}

export function analyzeNumber(number: string, type: string): NumberAnalysis {
  const seed = getDateSeed(number)
  const rand = seededRandom(seed)

  const sum = number.split('').reduce((acc, digit) => acc + parseInt(digit || '0'), 0)
  const index = Math.min(100, Math.max(1, sum * 7 + Math.floor(rand() * 20)))

  let level: NumberAnalysis['level'] = 'neutral'
  if (index >= 80) level = 'auspicious'
  else if (index < 40) level = 'inauspicious'

  return {
    number,
    type,
    index,
    level,
    element: ['金', '木', '水', '火', '土'][Math.floor(rand() * 5)],
    meaning: level === 'auspicious' ? '此号码寓意吉祥如意' : level === 'neutral' ? '此号码平平安安' : '此号码需要谨慎使用',
    description: `号码${number}的吉凶分析显示，此号码${level === 'auspicious' ? '非常吉利' : level === 'neutral' ? '运势平稳' : '需要注意'}。`,
    advice: level === 'auspicious' ? '继续保持积极心态' : level === 'neutral' ? '适当调整运势' : '建议多行善事，积德改运。',
  }
}
