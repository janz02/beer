import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { AppThunk } from 'app/store'
import { ListRequestParams, OrderByType } from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'
import { HubConnectionState } from '@microsoft/signalr'
import { api } from 'api'
import { NotificationData, NotificationDataDack } from 'models/notification'
import { GetNotificationsRequest } from 'api/swagger/coupon'
import { SignalrStatusReport } from 'middlewares/signalR/signalrTypes'

const NOTIFICATION_LIST_PAGE_SIZE = 20

export enum NotificationListState {
  Empty = 'Empty',
  LoadedFirst = 'LoadedFirst',
  LoadedMore = 'LoadedMore',
  LoadedAll = 'LoadedAll'
}

export enum NotificationFilterType {
  All = 'All',
  Read = 'Read',
  UnRead = 'UnRead'
}

interface NotificationState {
  listState: FeatureState
  listContentState: NotificationListState
  rtConnectionState?: HubConnectionState
  opened: boolean
  listParams: ListRequestParams
  visibleCount: number
  unseenCount: number
  /** The date of the most recent visible notification; for fetching the recent notifications. */
  newestDate?: moment.Moment
  /** An object that works as a Set, to avoid repeating the notifications;
   Set is not supported by immer by default, and an object works fine.
   In the component it is converted into an array. */
  notifications: NotificationDataDack
  activeFilter: NotificationFilterType
}

interface NotifiacationListActionPayload {
  list: NotificationData[]
  unseenCount: number
  listParams: ListRequestParams
  listContentState?: NotificationListState
}

const initialState: NotificationState = {
  listState: FeatureState.Initial,
  listContentState: NotificationListState.Empty,
  activeFilter: NotificationFilterType.All,
  opened: false,
  unseenCount: 0,
  visibleCount: 0,
  notifications: {},
  listParams: {
    page: 0,
    pageSize: NOTIFICATION_LIST_PAGE_SIZE,
    orderBy: 'Notification.CreatedDate',
    orderByType: OrderByType.Descending
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification: () => initialState,
    open(state) {
      state.opened = true
    },
    close(state) {
      state.opened = false
    },
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    setUnseenCount(state, action: PayloadAction<number>) {
      state.unseenCount = action.payload
    },
    setRtConnectionState(state, action: PayloadAction<HubConnectionState | undefined>) {
      state.rtConnectionState = action.payload
    },
    patchNotificationList(state, action: PayloadAction<NotifiacationListActionPayload>) {
      const { list, unseenCount, listParams, listContentState } = action.payload
      state.listState = FeatureState.Success
      state.unseenCount = unseenCount
      state.listParams = listParams
      list.forEach(noti => {
        if (noti.id) {
          // Overrides existing notifications, keeps the uniqueness.
          state.notifications[noti.id] = noti
          if (!state.newestDate || noti.createdDate?.isAfter(state.newestDate)) {
            state.newestDate = noti.createdDate
          }
        }
      })
      if (listContentState) {
        state.listContentState = listContentState
      }
      state.listState = FeatureState.Success

      // Incomming notifications offset the pagination, it has to be corrected.
      const actualPage = Object.keys(state.notifications).length / NOTIFICATION_LIST_PAGE_SIZE
      state.listParams = listParams
      state.listParams.page = Math.max(1, Math.floor(actualPage))
      state.visibleCount = Object.keys(state.notifications).length
    },
    readOneSuccess(state, action: PayloadAction<number>) {
      state.notifications[action.payload].isSeen = true
      state.unseenCount -= 1
    },
    readAllSuccess(state) {
      Object.keys(state.notifications).forEach(key => {
        state.notifications[key].isSeen = true
      })
      state.unseenCount = 0
    },
    unReadOneSuccess(state, action: PayloadAction<number>) {
      state.notifications[action.payload].isSeen = false
      state.unseenCount += 1
    },
    changeFilter(state, action: PayloadAction<NotificationFilterType>) {
      state.activeFilter = action.payload
    }
  }
})

const {
  open,
  close,
  resetNotification,
  setListState,
  readOneSuccess,
  unReadOneSuccess,
  readAllSuccess,
  setRtConnectionState,
  patchNotificationList,
  changeFilter
} = notificationSlice.actions

/**
 * Follows the pagination model
 */
const getNotifications = (): AppThunk => async (dispatch, getState) => {
  try {
    const { listParams, listContentState } = getState().notification
    dispatch(setListState(FeatureState.Loading))

    const newListParams: ListRequestParams = { ...listParams }

    switch (listContentState) {
      case NotificationListState.Empty:
        newListParams.page = 1
        break
      case NotificationListState.LoadedFirst:
      case NotificationListState.LoadedMore:
        newListParams.page = listParams.page ? listParams.page + 1 : 1
        break
      case NotificationListState.LoadedAll:
        dispatch(setListState(FeatureState.Success))
        return
    }

    const response = await api.notification.getNotifications(newListParams)

    const hasMore = response.size && response.to ? response.size > response.to : false
    const loadedMore = response.page ? response.page > 1 : false

    let newListContentState: NotificationListState | undefined = listContentState
    if (hasMore && loadedMore) {
      newListContentState = NotificationListState.LoadedMore
    } else if (hasMore && !loadedMore) {
      newListContentState = NotificationListState.LoadedFirst
    } else if (!hasMore) {
      newListContentState = NotificationListState.LoadedAll
    }

    const list =
      response.result?.map<NotificationData>(n => ({
        ...n,
        createdDate: moment(n.createdDate)
      })) ?? []
    const unseenCount = response.unseenCount ?? 0

    const actionPayload: NotifiacationListActionPayload = {
      list,
      unseenCount,
      listParams: newListParams,
      listContentState: newListContentState
    }

    dispatch(patchNotificationList(actionPayload))
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

/**
 * If the notification list is empty it follows the pagination model,
 * otherwise it fetches the notification between now and the most recent notification.
 */
const getRecentNotifications = (): AppThunk => async (dispatch, getState) => {
  try {
    dispatch(setListState(FeatureState.Loading))
    const { listParams, newestDate, listContentState } = getState().notification

    const newListParams: ListRequestParams = { ...listParams }
    let queryParams: GetNotificationsRequest = {}

    switch (listContentState) {
      case NotificationListState.Empty:
        newListParams.page = 1
        queryParams = newListParams
        break
      case NotificationListState.LoadedFirst:
      case NotificationListState.LoadedMore:
      case NotificationListState.LoadedAll:
      default:
        queryParams.fromDate = newestDate?.toDate()
        break
    }

    const response = await api.notification.getNotifications(queryParams)

    let newListContentState: NotificationListState | undefined
    if (listContentState === NotificationListState.Empty) {
      const hasMore = response.size && response.to ? response.size > response.to : false
      newListContentState = hasMore
        ? NotificationListState.LoadedFirst
        : NotificationListState.LoadedAll
    }

    const list =
      response.result?.map<NotificationData>(n => ({
        ...n,
        createdDate: moment(n.createdDate)
      })) ?? []

    const actionPayload: NotifiacationListActionPayload = {
      list,
      unseenCount: response.unseenCount ?? 0,
      listParams: newListParams,
      listContentState: newListContentState
    }

    dispatch(patchNotificationList(actionPayload))
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const readOne = (id: number): AppThunk => async dispatch => {
  try {
    await api.notification.seenNotification({ id })
    dispatch(readOneSuccess(id))
  } catch (err) {}
}

const readAll = (): AppThunk => async dispatch => {
  try {
    await api.notification.seenAllNotifications()
    dispatch(readAllSuccess())
  } catch (err) {}
}

const unReadOne = (id: number): AppThunk => async dispatch => {
  try {
    await api.notification.unSeenNotification({ id })
    dispatch(unReadOneSuccess(id))
  } catch (err) {}
}

const setConnectionState = (report: SignalrStatusReport): AppThunk => async dispatch => {
  dispatch(setRtConnectionState(report.connectionState))
}

export const notificationReducer = notificationSlice.reducer

export const notificationActions = {
  open,
  close,
  getNotifications,
  getRecentNotifications,
  resetNotification,
  readOne,
  readAll,
  unReadOne,
  setConnectionState,
  changeFilter
}

export const notificationActionType = {
  open: notificationSlice.actions.open.toString()
}
