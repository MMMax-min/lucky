import wuxingData from '@/data/wuxing.json'
import type { WuXingInput, WuXingResult, BaziInfo, Dayun, Remedies } from '@/types'

const HEAVENLY_STEMS = wuxingData.heavenlyStemsList
const EARTHLY_BRANCHES = wuxingData.earthlyBranchesList
const STEM_ELEMENTS = wuxingData.heavenlyStems
const BRANCH_ELEMENTS = wuxingData.earthlyBranches
const NAYIN = wuxingData.nayin
const ELEMENT_ATTRS = wuxingData.elementAttributes

function getGanIndex(year: number): number {
  return (year - 4) % 10
}

function getZhiIndex(year: number): number {
  return (year - 4) % 12
}

function getMonthGanZhi(year: number, month: number): { gan: string; zhi: string } {
  const yearGanIdx = getGanIndex(year)
  const monthZhiIdx = (month + 1) % 12
  const monthGanIdx = (yearGanIdx * 2 + month) % 10
  return {
    gan: HEAVENLY_STEMS[monthGanIdx],
    zhi: EARTHLY_BRANCHES[monthZhiIdx],
  }
}

function getDayGanZhi(year: number, month: number, day: number): { gan: string; zhi: string } {
  const baseDate = new Date(1900, 0, 1)
  const targetDate = new Date(year, month - 1, day)
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / 86400000)
  const ganIdx = (diffDays + 9) % 10
  const zhiIdx = (diffDays + 1) % 12
  return {
    gan: HEAVENLY_STEMS[ganIdx],
    zhi: EARTHLY_BRANCHES[zhiIdx],
  }
}

function getHourGanZhi(dayGan: string, hour: number): { gan: string; zhi: string } {
  const hourZhiIdx = Math.floor(((hour + 1) % 24) / 2)
  const dayGanIdx = HEAVENLY_STEMS.indexOf(dayGan)
  const hourGanIdx = (dayGanIdx * 2 + hourZhiIdx) % 10
  return {
    gan: HEAVENLY_STEMS[hourGanIdx],
    zhi: EARTHLY_BRANCHES[hourZhiIdx],
  }
}

function getElementCounts(pillars: { gan: string; zhi: string }[]): Record<string, number> {
  const counts: Record<string, number> = { metal: 0, wood: 0, water: 0, fire: 0, earth: 0 }
  pillars.forEach(p => {
    const ganElement = STEM_ELEMENTS[p.gan as keyof typeof STEM_ELEMENTS]?.element
    const zhiElement = BRANCH_ELEMENTS[p.zhi as keyof typeof BRANCH_ELEMENTS]?.element
    if (ganElement) counts[ganElement]++
    if (zhiElement) counts[zhiElement]++
  })
  return counts
}

function calculateDistribution(counts: Record<string, number>): Record<string, number> {
  const total = Object.values(counts).reduce((a, b) => a + b, 0)
  if (total === 0) return { metal: 20, wood: 20, water: 20, fire: 20, earth: 20 }
  const dist: Record<string, number> = {}
  for (const key of Object.keys(counts)) {
    dist[key] = Math.round((counts[key] / total) * 100)
  }
  return dist
}

function calculateStrength(distribution: Record<string, number>): Record<string, number> {
  const avg = Object.values(distribution).reduce((a, b) => a + b, 0) / 5
  const strength: Record<string, number> = {}
  for (const key of Object.keys(distribution)) {
    strength[key] = Math.round((distribution[key] / avg) * 50)
  }
  return strength
}

function findMissing(counts: Record<string, number>): string[] {
  const names: Record<string, string> = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' }
  return Object.entries(counts)
    .filter(([_, v]) => v === 0)
    .map(([k]) => names[k] || k)
}

function findProsperous(distribution: Record<string, number>): string[] {
  const names: Record<string, string> = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' }
  const max = Math.max(...Object.values(distribution))
  return Object.entries(distribution)
    .filter(([_, v]) => v === max)
    .map(([k]) => names[k] || k)
}

function determineFavorable(counts: Record<string, number>): { favorable: string[]; unfavorable: string[] } {
  const min = Math.min(...Object.values(counts))
  const names: Record<string, string> = { metal: '金', wood: '木', water: '水', fire: '火', earth: '土' }
  const favorable = Object.entries(counts)
    .filter(([_, v]) => v === min)
    .map(([k]) => names[k] || k)

  const relation = wuxingData.wuxingRelation
  const unfavorable: string[] = []
  favorable.forEach(f => {
    const elementKey = Object.keys(names).find(k => names[k] === f)
    if (elementKey) {
      const rel = relation[elementKey as keyof typeof relation]
      if (rel) {
        const restricted = names[rel.restrict]
        if (restricted && !unfavorable.includes(restricted)) {
          unfavorable.push(restricted)
        }
      }
    }
  })

  return { favorable, unfavorable }
}

function generateRemedies(favorable: string[]): Remedies {
  const namesToKeys: Record<string, string> = { '金': 'metal', '木': 'wood', '水': 'water', '火': 'fire', '土': 'earth' }
  const elementKey = namesToKeys[favorable[0]] || 'water'
  const attrs = ELEMENT_ATTRS[elementKey as keyof typeof ELEMENT_ATTRS]

  return {
    colors: attrs?.colors || ['蓝色'],
    directions: [attrs?.direction || '北方'],
    accessories: ['佩戴与喜用神相关的饰品'],
    numbers: attrs?.numbers || [1, 6],
    industries: attrs?.industries || [],
    description: `五行喜用神为${favorable.join('、')}，建议在日常生活中多接触与喜用神相关的颜色、方位和事物。`,
  }
}

function getNayin(gan: string, zhi: string): string {
  return NAYIN[gan + zhi as keyof typeof NAYIN] || ''
}

export function calculateWuXing(input: WuXingInput): WuXingResult {
  const { year, month, day } = input.solarDate
  const hour = input.hour

  const monthPillar = getMonthGanZhi(year, month)
  const dayPillar = getDayGanZhi(year, month, day)
  const hourPillar = getHourGanZhi(dayPillar.gan, hour)
  const yearPillar = {
    gan: HEAVENLY_STEMS[getGanIndex(year)],
    zhi: EARTHLY_BRANCHES[getZhiIndex(year)],
  }

  const pillars = [yearPillar, monthPillar, dayPillar, hourPillar]
  const counts = getElementCounts(pillars)
  const distribution = calculateDistribution(counts)
  const strength = calculateStrength(distribution)
  const missing = findMissing(counts)
  const prosperous = findProsperous(distribution)
  const { favorable, unfavorable } = determineFavorable(counts)
  const remedies = generateRemedies(favorable)

  return {
    bazi: {
      year: { heavenlyStem: yearPillar.gan, earthlyBranch: yearPillar.zhi },
      month: { heavenlyStem: monthPillar.gan, earthlyBranch: monthPillar.zhi },
      day: { heavenlyStem: dayPillar.gan, earthlyBranch: dayPillar.zhi },
      hour: { heavenlyStem: hourPillar.gan, earthlyBranch: hourPillar.zhi },
    },
    distribution,
    strength,
    missing,
    prosperous,
    favorableElement: favorable,
    unfavorableElement: unfavorable,
    remedies,
    nayin: getNayin(dayPillar.gan, dayPillar.zhi),
  }
}

export function getBaziInfo(date: { year: number; month: number; day: number }): BaziInfo {
  const dayPillar = getDayGanZhi(date.year, date.month, date.day)
  const branchData = BRANCH_ELEMENTS[dayPillar.zhi as keyof typeof BRANCH_ELEMENTS]

  return {
    heavenlyStems: [
      HEAVENLY_STEMS[getGanIndex(date.year)],
      getMonthGanZhi(date.year, date.month).gan,
      dayPillar.gan,
      getHourGanZhi(dayPillar.gan, 12).gan,
    ],
    earthlyBranchs: [
      EARTHLY_BRANCHES[getZhiIndex(date.year)],
      getMonthGanZhi(date.year, date.month).zhi,
      dayPillar.zhi,
      getHourGanZhi(dayPillar.gan, 12).zhi,
    ],
    animal: branchData?.animal || '',
    nayin: getNayin(dayPillar.gan, dayPillar.zhi),
    dayMaster: dayPillar.gan,
  }
}

export function getDayun(_bazi: BaziInfo): Dayun[] {
  const dayunList: Dayun[] = []
  for (let i = 0; i < 8; i++) {
    const startAge = i * 10
    dayunList.push({
      startAge,
      endAge: startAge + 9,
      startYear: 2024 - 30 + startAge,
      endYear: 2024 - 30 + startAge + 9,
      heavenlyStem: HEAVENLY_STEMS[i % 10],
      earthlyBranch: EARTHLY_BRANCHES[i % 12],
      element: STEM_ELEMENTS[HEAVENLY_STEMS[i % 10] as keyof typeof STEM_ELEMENTS]?.element || '',
      description: `第${i + 1}步大运`,
    })
  }
  return dayunList
}
