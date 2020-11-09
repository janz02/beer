export interface CampaignListItem {
  id?: number
  name?: string | null
  startDate?: moment.Moment
  endDate?: moment.Moment | null
  createdBy?: string | null
  responsible?: string | null
  status?: string | null
  statusId?: number
  canDelete?: boolean
  typeId?: number | null
  productId?: number | null
  segmentation?: number | null
  createdDate?: moment.Moment
  modifiedDate?: moment.Moment | null
  channels?: Array<number> | null
  channelId?: number | null
}
