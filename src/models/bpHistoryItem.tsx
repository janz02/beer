import { Channels } from './channels'
import moment from 'moment'

export interface BpHistoryItem {
  id?: number
  campaignName?: string | null
  campaignTechnicalName?: string | null
  createdDate?: moment.Moment
  bpId?: string | null
  contact?: string | null
  channelId?: Channels
  event?: string | null
  eventResult?: string | null
  campaignResult?: string | null
  templateId?: number | null
}
