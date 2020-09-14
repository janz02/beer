import {
  notificationActions,
  NotificationListState,
  NotificationFilterType
} from './notificationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { useCallback, useMemo } from 'react'
import { notification } from 'antd'
import { NotificationData } from 'models/notification'
import { Roles } from 'api/swagger/coupon'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
// NotificationLinks are manually created for all new notificationType generated from the backend api swagger.
import notificationLinks from './notificationLinks.json'
import { NotificationLinkPreValidator } from './NotificationLinkPreValidator'

export const notificationRoleConfig = [Roles.Administrator, Roles.CampaignManager]

interface UseNotificationFeatures {
  opened: boolean
  unseenCount: number
  notifications: NotificationData[]
  filteredNotifications: NotificationData[]
  loading: boolean
  canLoadMore: boolean
  activeFilter: string
  handleGetNotifications: () => void
  handleOpen: () => void
  handleClose: () => void
  handleReadAll: () => void
  handleInspectItem: (e: Event, item: NotificationData) => void
  handleNavigateItem: (item: NotificationData) => void
  handleFilterChange: (activeTabKey: string) => void
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
    unseenCount,
    activeFilter
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

  const filteredNotifications = useMemo(() => {
    switch (activeFilter) {
      case NotificationFilterType.All:
        return notifications
      case NotificationFilterType.Read:
        return notifications.filter(n => n.isSeen)
      case NotificationFilterType.UnRead:
        return notifications.filter(n => !n.isSeen)
      default:
        return notifications
    }
  }, [notifications, activeFilter])

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

  const handleInspectItem = useCallback(
    (e: Event, item: NotificationData): void => {
      e?.stopPropagation()
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

  const preValidateNotificationLink = async (item: NotificationData): Promise<boolean> => {
    if (
      item.type &&
      item.actualId !== undefined &&
      item.parentId !== undefined &&
      NotificationLinkPreValidator[item.type] !== undefined
    ) {
      try {
        const preValidation = await NotificationLinkPreValidator[item.type](
          item.actualId,
          item.parentId
        )
        return preValidation
      } catch {
        return false
      }
    }
    return false
  }

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
    async (item: NotificationData): Promise<void> => {
      if (!item.isSeen && item.id) {
        dispatch(notificationActions.readOne(item.id))
      }

      const preValidationResult = await preValidateNotificationLink(item)
      if (!preValidationResult) {
        notification.error({
          message: t('error.notification.entity-for-navigation-does-not-exists'),
          duration: null
        })
        return
      }

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
    [dispatch, t, history]
  )

  const handleFilterChange = useCallback(
    (activeTabKey: string): void => {
      dispatch(notificationActions.changeFilter(activeTabKey as NotificationFilterType))
    },
    [dispatch]
  )

  return {
    opened,
    unseenCount,
    notifications,
    filteredNotifications,
    loading,
    canLoadMore,
    activeFilter,
    handleGetNotifications,
    handleOpen,
    handleClose,
    handleReadAll,
    handleInspectItem,
    handleNavigateItem,
    handleFilterChange
  }
}
