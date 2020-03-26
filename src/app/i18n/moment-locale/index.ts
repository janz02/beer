import moment from 'moment'
import { setupMomentHu } from './hu'
import { setupMomentEn } from './en'

export const setupMomentLocale = (): void => {
  setupMomentHu()
  setupMomentEn()
}
export const setMomentLocale = (lang: string): void => {
  moment.locale(lang)
}
