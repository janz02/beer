import { notificationActions, NotificationListState } from './notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useCallback, useMemo } from 'react'
import { NotificationData } from 'models/notification'

interface UseNotificationFeatures {
  opened: boolean
  unreadCount: number
  notifications: NotificationData[]
  loading: boolean
  canLoadMore: boolean
  handleGetNotifications: () => void
  handleClose: () => void
  handleOpen: () => void
  inspectItem: (item: NotificationData) => void
}

const { getNotifications, close, open } = notificationActions

export const useNotification = (): UseNotificationFeatures => {
  const dispatch = useDispatch()
  const {
    notifications: notificationsObj,
    listState,
    opened,
    listContentState,
    unseenCount: unreadCount
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

  const inspectItem = (item: NotificationData): void => {
    if (item.isSeen === false && item.id) {
      dispatch(notificationActions.markAsSeen(item.id))
    }
  }

  const handleGetNotifications = useCallback((): void => {
    dispatch(getNotifications())
  }, [dispatch])

  return {
    opened,
    unreadCount,
    notifications,
    loading,
    canLoadMore,
    handleClose,
    handleOpen,
    handleGetNotifications,
    inspectItem
  }
}
