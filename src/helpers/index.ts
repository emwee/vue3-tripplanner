import { CURRENCY, LOCALE } from '@/constants'

export const formatWeekday = (date: string) => {
  return new Date(date).toLocaleDateString(LOCALE, {
    weekday: 'short',
  })
}
export const formatDay = (date: string) => {
  return new Date(date).toLocaleDateString(LOCALE, {
    day: 'numeric',
  })
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    maximumFractionDigits: 2,
  }).format(value)
}

export const shouldDisplaySeparator = (dates: string[], index: number) => {
  if (index === dates.length - 1) {
    return false
  }

  return new Date(dates[index]).getMonth() !== new Date(dates[index + 1]).getMonth()
}

export const getUniqeId = () => Math.floor(new Date().valueOf() * Math.random())
