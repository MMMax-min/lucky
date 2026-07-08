export function formatDate(date: Date, format = 'YYYY-MM-DD'): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return format.replace('YYYY', String(y)).replace('MM', m).replace('DD', d)
}

export function getWeekday(date: Date): string {
  const days = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return days[date.getDay()]
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate()
}

export function isToday(date: string): boolean {
  return date === formatDate(new Date())
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export function isSameDay(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
}

export function dateRange(start: string, end: string): string[] {
  const dates: string[] = []
  const startDate = new Date(start)
  const endDate = new Date(end)
  let current = new Date(startDate)
  while (current <= endDate) {
    dates.push(formatDate(current))
    current = addDays(current, 1)
  }
  return dates
}
