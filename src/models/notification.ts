import { NotificationType } from 'api/swagger/coupon'
import { NotificationDetail } from './notificationDetail'
import moment from 'moment'

export interface NotificationData {
  key?: any
  id?: number
  isSeen?: boolean
  type?: NotificationType | null
  createdDate?: moment.Moment
  parent: NotificationDetail
  actual: NotificationDetail
  value?: string | null
}

export interface NotificationDataDack {
  [notificationId: string]: NotificationData
}
