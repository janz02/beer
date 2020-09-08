import { notificationActions, NotificationListState } from './notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useCallback, useMemo } from 'react'
import { notification } from 'antd'
import { NotificationData } from 'models/notification'
import { Roles } from 'api/swagger/models/Roles'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// NotificationLinks are manually created for all new notificationType generated from the backend api swagger.
import notificationLinks from './notificationLinks.json'

export const notificationRoleConfig = [Roles.Administrator, Roles.CampaignManager]

interface UseNotificationFeatures {
  opened: boolean
  unseenCount: number
  notifications: NotificationData[]
  loading: boolean
  canLoadMore: boolean
  handleGetNotifications: () => void
  handleOpen: () => void
  handleClose: () => void
  handleReadAll: () => void
  handleInspectItem: (e: Event, item: NotificationData) => void
  handleNavigateItem: (item: NotificationData) => void
}

const { getNotifications, close, open } = notificationActions

export const useNotification = (): UseNotificationFeatures => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
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

  const handleGetNotifications = useCallback((): void => {
    dispatch(getNotifications())
  }, [dispatch])

  const handleOpen = useCallback((): void => {
    dispatch(open())
  }, [dispatch])

  const handleClose = useCallback((): void => {
    dispatch(close())
  }, [dispatch])

  const handleReadAll = useCallback((): void => {
    dispatch(notificationActions.readAll())
  }, [dispatch])

  const inspectItem = useCallback(
    (item: NotificationData): void => {
      if (item.id) {
        if (item.isSeen) {
          dispatch(notificationActions.unReadOne(item.id))
        } else {
          dispatch(notificationActions.readOne(item.id))
        }
      }
    },
    [dispatch]
  )

  const handleInspectItem = useCallback(
    (e: Event, item: NotificationData): void => {
      e?.stopPropagation()
      inspectItem(item)
    },
    [inspectItem]
  )

  const getNotificationLink = (notification: NotificationData): string | undefined => {
    let link = notificationLinks.find(
      notificationLink => notificationLink.type === notification?.type?.toString()
    )?.link

    if (!link) {
      return undefined
    }

    if (notification.actualId) {
      link = link.replace('{actualId}', notification.actualId.toString())
    }

    if (notification.parentId) {
      link = link.replace('{parentId}', notification.parentId.toString())
    }

    // Do not return with invalid link
    if (link.indexOf('{parentId}') !== -1 || link?.indexOf('{actualId}') !== -1) {
      return undefined
    }

    return link
  }
  const handleNavigateItem = useCallback(
    (item: NotificationData): void => {
      inspectItem(item)

      const link = getNotificationLink(item)
      if (link) {
        history.push(link)
        dispatch(close())
      } else {
        notification.error({
          message: t('error.notification.cannot-navigate-to-notification-link'),
          duration: null
        })
      }
    },
    [dispatch, t, history, inspectItem]
  )

  return {
    opened,
    unseenCount,
    notifications,
    loading,
    canLoadMore,
    handleGetNotifications,
    handleOpen,
    handleClose,
    handleReadAll,
    handleInspectItem,
    handleNavigateItem
  }
}
