import moment from 'moment'
export interface NewsletterVersion {
  id: number
  version: number
}

export interface NewsletterPreviewData {
  id?: number
  name?: string | null
}

export interface NewsletterHistoryItem {
  id?: number
  content?: string | null
  modifiedBy?: string | null
  modifiedAt?: moment.Moment
  version?: number
}

export interface NewsletterData extends NewsletterPreviewData {
  version?: NewsletterVersion
  content?: string
  versions?: NewsletterVersion[]
  history?: NewsletterHistoryItem[]
}
