import moment from 'moment'

export interface SiteApiKey {
  id?: number
  name?: string | null
  expireDate?: moment.Moment
  isActive?: boolean
}
