import { notificationActions, NotificationData } from './notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useCallback } from 'react'

interface UseNotificationListFeatures {
  notifications: NotificationData[]
  loading: boolean
  canLoadMore: boolean
  handeGetNotifications: () => void
}

export const useNotificationList = (): UseNotificationListFeatures => {
  const { getNotifications } = notificationActions
  const dispatch = useDispatch()
  const { notifications, hasMore, listState } = useSelector(
    (state: RootState) => state.notification
  )

  const loading = listState === FeatureState.Loading
  const canLoadMore = !loading && hasMore

  const handeGetNotifications = useCallback((): void => {
    dispatch(getNotifications())
  }, [dispatch, getNotifications])

  return {
    notifications,
    loading,
    canLoadMore,
    handeGetNotifications
  }
}
