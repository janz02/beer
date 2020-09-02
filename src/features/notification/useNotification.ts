import { notificationActions, NotificationListState } from './notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useCallback, useMemo } from 'react'
import { NotificationData } from 'models/notification'
import { Roles } from 'api/swagger/models'
import { NotificationType } from 'api/swagger/models/NotificationType'
import { useHistory } from 'react-router-dom'

export const notificationRoleConfig = [Roles.Administrator, Roles.CampaignManager]

export const notificationLinks = [
  {
    type: NotificationType.CampaignMovedToWaitingState,
    link: "/campaign/{actualId}"
  },
  {
    type: NotificationType.PartnerContactRegistered,
    link: "/partners/{parentId}"
  }
]

interface UseNotificationFeatures {
  opened: boolean
  unseenCount: number
  notifications: NotificationData[]
  loading: boolean
  canLoadMore: boolean
  handleGetNotifications: () => void
  handleClose: () => void
  handleOpen: () => void
  handleReadAll: () => void
  handleInspectItem: (item: NotificationData, e?: Event) => void,
  handleNavigateItem: (item: NotificationData) => void
}

const { getNotifications, close, open } = notificationActions

export const useNotification = (): UseNotificationFeatures => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    notifications: notificationsObj,
    listState,
    opened,
    listContentState,
    unseenCount
  } = useSelector((state: RootState) => state.notification)

  const loading = listState === FeatureState.Loading
  const canLoadMore = !loading && listContentState !== NotificationListState.LoadedAll

  const handleClose = (): void => {
    dispatch(close())
  }

  const notifications = useMemo(() => {
    const notificationArray: NotificationData[] = []
    Object.keys(notificationsObj).forEach(key => {
      if (notificationsObj[key]) {
        notificationArray.push({ ...notificationsObj[key], key: key })
      }
    })
    notificationArray.sort((a, b) => (a.createdDate?.isBefore(b.createdDate) ? 1 : -1))
    return notificationArray
  }, [notificationsObj])

  const handleOpen = (): void => {
    dispatch(open())
  }

  const handleInspectItem = (item: NotificationData, e?: Event): void => {
    e?.stopPropagation()

    if (item.isSeen === false && item.id) {
      dispatch(notificationActions.readOne(item.id))
    }
  }

  const handleNavigateItem = (item: NotificationData): void => {
    handleInspectItem(item);

    if (item.id) {
      const link = getNotificationLink(item)
      if (link) {
        history.push(link)
      }
    }
  }

  const getNotificationLink = (notification: NotificationData): string | undefined => {
    let link = notificationLinks.find((notificationLink) => notificationLink.type === notification.type)?.link;

    if (!link) {
      return undefined
    }

    if (notification.actualId !== undefined) {
      link = link.replace("{actualId}", notification.actualId.toString())
    }

    if (notification.parentId !== undefined) {
      link = link.replace("{parentId}", notification.parentId.toString())
    }

    // Do not return with invalid link
    if (link.indexOf("{parentId}") !== -1 || link?.indexOf("{actualId}") !== -1) {
      return undefined
    }

    return link
  }

  const handleReadAll = (): void => {
    dispatch(notificationActions.readAll())
  }

  const handleGetNotifications = useCallback((): void => {
    dispatch(getNotifications())
  }, [dispatch])


  return {
    opened,
    unseenCount,
    notifications,
    loading,
    canLoadMore,
    handleReadAll,
    handleClose,
    handleOpen,
    handleGetNotifications,
    handleInspectItem,
    handleNavigateItem
  }
}
