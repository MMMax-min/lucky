import type { AuspiciousQuery, AuspiciousDay, HuangliInfo, EventType } from '@/types'

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

const EVENT_SUITABLE: Record<EventType, string[]> = {
  marriage: ['嫁娶', '订盟', '纳采', '裁衣', '合帐', '安床'],
  engagement: ['订盟', '纳采', '裁衣', '祈福'],
  move: ['移徙', '入宅', '安香', '安床', '挂匾'],
  travel: ['出行', '裁衣', '交易', '立券'],
  business: ['开市', '交易', '立券', '挂匾', '开光'],
  construction: ['动土', '修造', '竖柱', '上梁', '盖屋'],
  renovation: ['修造', '动土', '拆卸', '安门'],
  worship: ['祭祀', '祈福', '斋醮', '开光'],
  prayer: ['祈福', '斋醮', '开光', '求嗣'],
  other: ['嫁娶', '开市', '出行', '入宅'],
}

const EVENT_AVOID: Record<EventType, string[]> = {
  marriage: ['开市', '造屋', '作灶', '栽种'],
  engagement: ['动土', '破土', '安葬'],
  move: ['开市', '栽种', '置产'],
  travel: ['嫁娶', '动土', '安葬'],
  business: ['嫁娶', '入宅', '移徙'],
  construction: ['嫁娶', '开市', '入宅'],
  renovation: ['开市', '嫁娶', '入宅'],
  worship: ['动土', '破土', '开市'],
  prayer: ['动土', '破土', '嫁娶'],
  other: ['动土', '破土'],
}

const SPIRITS = {
  favorable: ['天德', '月德', '天赦', '三合', '六合', '敬安', '宝光', '福生', '凤鸣', '天恩'],
  unfavorable: ['月破', '大耗', '四废', '九空', '月建', '月刑', '月害', '劫煞', '灾煞'],
}

const ZODIACS = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const DIRECTIONS = ['东', '南', '西', '北', '东南', '东北', '西南', '西北']

function getWeekday(date: string): string {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return days[new Date(date).getDay()]
}

function getLunarDate(date: string): string {
  const d = new Date(date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
  const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十']
  return `农历${lunarMonths[month - 1]}月${lunarDays[day - 1] || '三十'}`
}

export function queryAuspiciousDays(query: AuspiciousQuery): AuspiciousDay[] {
  const { startDate, endDate, eventType, avoidZodiac } = query
  const results: AuspiciousDay[] = []

  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffDays = Math.floor((end.getTime() - start.getTime()) / 86400000)

  for (let i = 0; i <= diffDays && i < 365; i++) {
    const currentDate = new Date(start)
    currentDate.setDate(currentDate.getDate() + i)
    const dateStr = currentDate.toISOString().split('T')[0]
    const seed = getDateSeed(dateStr + eventType)
    const rand = seededRandom(seed)

    const score = rand()
    let level: AuspiciousDay['level'] = 'neutral'
    if (score > 0.7) level = 'auspicious'
    else if (score < 0.2) level = 'inauspicious'

    const suitable = EVENT_SUITABLE[eventType] || EVENT_SUITABLE.other
    const avoid = EVENT_AVOID[eventType] || EVENT_AVOID.other

    const zodiacIdx = Math.floor(rand() * 12)
    const clashZodiac = ZODIACS[zodiacIdx]

    if (avoidZodiac && clashZodiac === avoidZodiac) {
      continue
    }

    const favorableCount = Math.floor(rand() * 3) + 1
    const unfavorableCount = Math.floor(rand() * 2)
    const favorable = SPIRITS.favorable
      .sort(() => rand() - 0.5)
      .slice(0, favorableCount)
    const unfavorable = SPIRITS.unfavorable
      .sort(() => rand() - 0.5)
      .slice(0, unfavorableCount)

    const recommendation = level === 'auspicious' ? Math.floor(rand() * 2) + 4
      : level === 'neutral' ? Math.floor(rand() * 2) + 2
      : Math.floor(rand() * 2) + 1

    results.push({
      date: dateStr,
      weekday: getWeekday(dateStr),
      lunarDate: getLunarDate(dateStr),
      level,
      suitable,
      avoid,
      clash: {
        zodiac: clashZodiac,
        direction: DIRECTIONS[Math.floor(rand() * 8)],
      },
      spirits: { favorable, unfavorable },
      recommendation: Math.min(5, recommendation),
    })
  }

  return results.sort((a, b) => {
    if (a.level === 'auspicious' && b.level !== 'auspicious') return -1
    if (a.level !== 'auspicious' && b.level === 'auspicious') return 1
    return b.recommendation - a.recommendation
  })
}

export function getHuangli(date: string): HuangliInfo {
  const seed = getDateSeed(date)
  const rand = seededRandom(seed)

  const suitablePool = ['嫁娶', '订盟', '纳采', '裁衣', '合帐', '安床', '移徙', '入宅', '开市', '交易', '立券', '挂匾', '祭祀', '祈福', '动土', '修造', '出行']
  const avoidPool = ['开市', '造屋', '作灶', '栽种', '安葬', '破土', '词讼']

  return {
    date,
    lunarDate: getLunarDate(date),
    suitable: suitablePool.sort(() => rand() - 0.5).slice(0, Math.floor(rand() * 4) + 2),
    avoid: avoidPool.sort(() => rand() - 0.5).slice(0, Math.floor(rand() * 3) + 1),
    clash: {
      zodiac: ZODIACS[Math.floor(rand() * 12)],
      direction: DIRECTIONS[Math.floor(rand() * 8)],
    },
    favorableSpirits: SPIRITS.favorable.sort(() => rand() - 0.5).slice(0, 3),
    unfavorableSpirits: SPIRITS.unfavorable.sort(() => rand() - 0.5).slice(0, 2),
    pengzu: ['甲不开仓财物耗散', '子不问卜自惹祸殃'][Math.floor(rand() * 2)],
    fiveElements: ['金', '木', '水', '火', '土'][Math.floor(rand() * 5)],
    dutyGod: ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'][Math.floor(rand() * 12)],
    star: ['青龙', '明堂', '天刑', '朱雀', '金匮', '天德', '白虎', '玉堂', '天牢', '玄武', '司命', '勾陈'][Math.floor(rand() * 12)],
    fetalGod: ['占门灶外正南', '占厨灶床外正东', '占仓库门外正南'][Math.floor(rand() * 3)],
  }
}

export function getAuspiciousHours(date: string, eventType?: EventType): { time: string; duration: string; element: string; suitable: string[]; avoid: string[]; description: string }[] {
  const seed = getDateSeed(date + 'hours')
  const rand = seededRandom(seed)

  const hours = []
  for (let i = 0; i < 12; i++) {
    const hourNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
    const hourTimes = ['23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
      '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
      '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00']
    const elements = ['水', '土', '木', '木', '土', '火', '火', '土', '金', '金', '土', '水']

    hours.push({
      time: hourTimes[i],
      duration: '2小时',
      element: elements[i],
      suitable: eventType
        ? (EVENT_SUITABLE[eventType] || EVENT_SUITABLE.other).sort(() => rand() - 0.5).slice(0, 2)
        : ['祭祀', '祈福', '出行'],
      avoid: eventType
        ? (EVENT_AVOID[eventType] || EVENT_AVOID.other).sort(() => rand() - 0.5).slice(0, 1)
        : ['动土'],
      description: `${hourNames[i]}时（${hourTimes[i]}）五行属${elements[i]}，适合${eventType ? '相关' : '一般'}活动。`,
    })
  }
  return hours
}
