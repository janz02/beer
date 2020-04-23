import { notificationActions, NotificationData } from './notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useCallback } from 'react'

interface UseNotificationFeatures {
  opened: boolean
  unreadCount: number
  notifications: NotificationData[]
  loading: boolean
  canLoadMore: boolean
  handleGetNotifications: () => void
  handleClose: () => void
  handleOpen: () => void
  inspectItem: (id: string) => void
}

export const useNotification = (): UseNotificationFeatures => {
  const { getNotifications, close, open, inspectNotification } = notificationActions
  const dispatch = useDispatch()
  const { notifications, hasMore, listState, opened, unreadCount } = useSelector(
    (state: RootState) => state.notification
  )

  const loading = listState === FeatureState.Loading
  const canLoadMore = !loading && hasMore

  const handleClose = (): void => {
    dispatch(close())
  }

  const handleOpen = (): void => {
    dispatch(open())
  }

  const inspectItem = (id: string): void => {
    dispatch(inspectNotification(id))
    dispatch(close())
  }

  const handleGetNotifications = useCallback((): void => {
    dispatch(getNotifications())
  }, [dispatch, getNotifications])

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
