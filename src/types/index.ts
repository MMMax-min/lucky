export type WuXingElement = 'metal' | 'wood' | 'water' | 'fire' | 'earth'

export interface SolarDate {
  year: number
  month: number
  day: number
}

export interface WuXingInput {
  solarDate: SolarDate
  hour: number
  isLunar?: boolean
  gender?: 'male' | 'female'
}

export interface PillarData {
  heavenlyStem: string
  earthlyBranch: string
}

export interface WuXingResult {
  bazi: {
    year: PillarData
    month: PillarData
    day: PillarData
    hour: PillarData
  }
  distribution: Record<WuXingElement, number>
  strength: Record<WuXingElement, number>
  missing: string[]
  prosperous: string[]
  favorableElement: string[]
  unfavorableElement: string[]
  remedies: Remedies
  nayin: string
}

export interface Remedies {
  colors: string[]
  directions: string[]
  accessories: string[]
  numbers: number[]
  industries: string[]
  description: string
}

export interface BaziInfo {
  heavenlyStems: string[]
  earthlyBranchs: string[]
  animal: string
  nayin: string
  dayMaster: string
}

export interface Dayun {
  startAge: number
  endAge: number
  startYear: number
  endYear: number
  heavenlyStem: string
  earthlyBranch: string
  element: string
  description: string
}

export type Constellation =
  | 'aries' | 'taurus' | 'gemini' | 'cancer'
  | 'leo' | 'virgo' | 'libra' | 'scorpio'
  | 'sagittarius' | 'capricorn' | 'aquarius' | 'pisces'

export interface FortuneResult {
  constellation: {
    name: string
    dateRange: string
    element: string
    rulingPlanet: string
    symbol: string
  }
  overall: number
  dimensions: {
    love: number
    career: number
    wealth: number
    health: number
    social: number
  }
  description: string
  lucky: {
    color: string
    number: number
    direction: string
    gemstone: string
  }
  compatible: string[]
  caution: string
  tips: string[]
}

export interface MatchResult {
  index: number
  level: 'excellent' | 'good' | 'average' | 'poor'
  description: string
  strengths: string[]
  weaknesses: string[]
  advice: string[]
}

export type EventType =
  | 'marriage' | 'engagement' | 'move' | 'travel' | 'business'
  | 'construction' | 'renovation' | 'worship' | 'prayer' | 'other'

export interface AuspiciousQuery {
  startDate: string
  endDate: string
  eventType: EventType
  avoidZodiac?: string
}

export interface AuspiciousDay {
  date: string
  weekday: string
  lunarDate: string
  level: 'auspicious' | 'neutral' | 'inauspicious'
  suitable: string[]
  avoid: string[]
  clash: { zodiac: string; direction: string }
  spirits: { favorable: string[]; unfavorable: string[] }
  recommendation: number
  note?: string
}

export interface HuangliInfo {
  date: string
  lunarDate: string
  solarTerm?: string
  suitable: string[]
  avoid: string[]
  clash: { zodiac: string; direction: string }
  favorableSpirits: string[]
  unfavorableSpirits: string[]
  pengzu: string
  fiveElements: string
  dutyGod: string
  star: string
  胎神: string
}

export interface AuspiciousHour {
  time: string
  duration: string
  element: string
  suitable: string[]
  avoid: string[]
  description: string
}

export interface ZodiacFortune {
  zodiac: string
  element: string
  personality: string[]
  fortune: { overall: number; love: number; career: number; wealth: number }
  description: string
  compatible: string[]
  incompatible: string[]
}

export interface LoveMatchResult {
  index: number
  level: 'perfect' | 'excellent' | 'good' | 'average' | 'poor'
  description: string
  similarity: number
  complementary: number
  advice: string[]
}

export interface NameAnalysis {
  name: string
  fiveGrid: { heavenGrid: number; humanGrid: number; earthGrid: number; outerGrid: number; totalGrid: number }
  elements: string[]
  personality: string[]
  fortune: string
  suggestion: string
}

export interface NumberAnalysis {
  number: string
  type: string
  index: number
  level: 'auspicious' | 'neutral' | 'inauspicious'
  element: string
  meaning: string
  description: string
  advice: string
}
