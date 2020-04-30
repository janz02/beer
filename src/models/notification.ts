import { NotificationType } from 'api/swagger/models'
import moment from 'moment'

export interface NotificationData {
  key?: any
  id?: number
  isSeen?: boolean
  type?: NotificationType | null
  createdDate?: moment.Moment
  parentId?: number
  actualId?: number
  value?: string | null
}

export interface NotificationDataDack {
  [notificationId: string]: NotificationData
}
