export function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

export function getElementColor(element: string): string {
  const colors: Record<string, string> = {
    metal: '#FFD700',
    wood: '#228B22',
    water: '#4169E1',
    fire: '#DC143C',
    earth: '#DAA520',
  }
  return colors[element] || '#999999'
}

export function getElementChinese(element: string): string {
  const names: Record<string, string> = {
    metal: '金',
    wood: '木',
    water: '水',
    fire: '火',
    earth: '土',
  }
  return names[element] || element
}

export function getZodiacChinese(zodiac: string): string {
  const names: Record<string, string> = {
    rat: '鼠', ox: '牛', tiger: '虎', rabbit: '兔',
    dragon: '龙', snake: '蛇', horse: '马', goat: '羊',
    monkey: '猴', rooster: '鸡', dog: '狗', pig: '猪',
  }
  return names[zodiac] || zodiac
}

export function getConstellationChinese(constellation: string): string {
  const names: Record<string, string> = {
    aries: '白羊座', taurus: '金牛座', gemini: '双子座',
    cancer: '巨蟹座', leo: '狮子座', virgo: '处女座',
    libra: '天秤座', scorpio: '天蝎座', sagittarius: '射手座',
    capricorn: '摩羯座', aquarius: '水瓶座', pisces: '双鱼座',
  }
  return names[constellation] || constellation
}

export function getConstellationSymbol(constellation: string): string {
  const symbols: Record<string, string> = {
    aries: '♈', taurus: '♉', gemini: '♊',
    cancer: '♋', leo: '♌', virgo: '♍',
    libra: '♎', scorpio: '♏', sagittarius: '♐',
    capricorn: '♑', aquarius: '♒', pisces: '♓',
  }
  return symbols[constellation] || '★'
}

export function getEventTypeChinese(type: string): string {
  const names: Record<string, string> = {
    marriage: '婚嫁', engagement: '订婚', move: '搬家',
    travel: '出行', business: '开业', construction: '动土',
    renovation: '装修', worship: '祭祀', prayer: '祈福', other: '其他',
  }
  return names[type] || type
}

export function getStarsHtml(count: number): string {
  return '★'.repeat(count) + '☆'.repeat(5 - count)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
