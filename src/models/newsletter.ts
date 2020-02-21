export interface NewsletterVersion {
  id: number
  version: number
}

export interface NewsletterPreviewData {
  id: number
  name: string
}

export interface NewsletterData extends NewsletterPreviewData {
  version?: NewsletterVersion
  html?: string
  versions?: NewsletterVersion[]
}
