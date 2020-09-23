import { Channels } from './channels'

export interface BpHistoryItem {
  id?: number
  campaignName?: string | null
  campaignTechnicalName?: string | null
  createdDate?: Date
  bpId?: string | null
  contact?: string | null
  channelId?: Channels
  event?: string | null
  eventResult?: string | null
  campaignResult?: string | null
  templateId?: number | null
}
