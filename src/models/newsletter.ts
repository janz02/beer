import moment from 'moment'
export interface NewsletterVersion {
  id: number
  version: number
}

export interface NewsletterHistoryItem {
  id?: number
  content?: string | null
  modifiedBy?: string | null
  modifiedAt?: moment.Moment
  version?: number
}

export interface NewsletterPreview extends NewsletterHistoryItem {
  name?: string | null
}

export interface Newsletter extends NewsletterPreview {
  history?: NewsletterHistoryItem[]
}
