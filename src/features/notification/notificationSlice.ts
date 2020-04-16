import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from 'moment'
import { AppThunk } from 'app/store'
import { delay } from 'services/temp/delay'
import { ListRequestParams } from 'hooks/useTableUtils'
import { FeatureState } from 'models/featureState'

// TODO: Remove
const TEMP_DATA: NotificationData[] = [
  {
    id: '1',
    title: 'New Shell Coupons',
    description: 'Free coupons for you! Buy more shell stuff. bla blb alvlb gkfk sjdksjd dksjfdk',
    read: false,
    image: 'https://i7.pngguru.com/preview/9/209/70/5bbc0e96b85d3.jpg',
    deliveryTime: '20200103T080910'
  },
  {
    id: '8',
    title: 'Old Shell Coupons',
    description: 'Free coupons for you! Buy more shell stuff. bla blb alvlb gkfk sjdksjd dksjfdk',
    read: true,
    image: 'https://i7.pngguru.com/preview/9/209/70/5bbc0e96b85d3.jpg',
    deliveryTime: '20181228T080910'
  },
  {
    id: '3',
    title: 'Empty notification',
    description: '',
    read: true,
    image: '',
    deliveryTime: '20191226T080910'
  },
  {
    id: '4',
    title: 'Unread notification',
    description: 'hfhsd jdfksjdfk kjfkjsd',
    read: false,
    image: '',
    deliveryTime: '20191226T080910'
  },
  {
    id: '5',
    title: 'Lazy notification',
    description: '',
    read: true,
    image: '',
    deliveryTime: '20191226T080910'
  },
  {
    id: '6',
    title: 'Old notification',
    description: 'mnd dsfndsflkj mdsflk',
    read: true,
    image: '',
    deliveryTime: '20181226T080910'
  },
  {
    id: '7',
    title: 'Very old notification',
    description: '',
    read: true,
    image: '',
    deliveryTime: '20171226T080910'
  }
]

export interface NotificationData {
  id: string
  title: string
  description: string
  read: boolean
  image: string
  deliveryTime: Moment | string
}

interface NotificationState {
  unreadCount: number
  hasMore: boolean
  listParams: ListRequestParams
  notifications: NotificationData[]
  listState: FeatureState
  itemState: FeatureState
}

const initialState: NotificationState = {
  unreadCount: 0,
  listState: FeatureState.Initial,
  itemState: FeatureState.Initial,
  notifications: [],
  hasMore: true,
  listParams: {
    pageSize: 10
  }
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotification: () => initialState,
    setListState(state, action: PayloadAction<FeatureState>) {
      state.listState = action.payload
    },
    setItemState(state, action: PayloadAction<FeatureState>) {
      state.itemState = action.payload
    },
    getNotificationsSuccess(state, action: PayloadAction<NotificationData[]>) {
      state.notifications.unshift(...action.payload)
      state.notifications = state.notifications.sort((a, b) =>
        (a.deliveryTime as Moment).isBefore(b.deliveryTime as Moment) ? 1 : -1
      )
      // TODO - get this from api response
      state.unreadCount = 0
      state.notifications.forEach(noti => {
        state.unreadCount += +!noti.read
      })
      state.listState = FeatureState.Success
      state.hasMore = state.notifications.length < 60
    },
    inspectNotificationSuccess(state, action: PayloadAction<string>) {
      // TODO: this is for simulation at this point
      const id = action.payload
      const idx = state.notifications.findIndex(noti => noti.id === id)
      state.notifications[idx].read = true
      // TODO - get this from api response
      state.unreadCount = 0
      state.notifications.forEach(noti => {
        state.unreadCount += +!noti.read
      })
    }
  }
})

const {
  resetNotification,
  setListState,
  setItemState,
  inspectNotificationSuccess,
  getNotificationsSuccess
} = notificationSlice.actions

const getNotifications = (params: ListRequestParams = {}): AppThunk => async dispatch => {
  dispatch(setListState(FeatureState.Loading))
  try {
    // TODO: needs real api connection
    const data = (await delay(
      [...TEMP_DATA].map(noti => ({
        ...noti,
        id: Date.now() + `_${noti.id}_${Math.round(Math.random() * 2000)}`,
        deliveryTime: moment(noti.deliveryTime),
        description: noti.description + moment.now()
      })),
      400
    )) as NotificationData[]
    dispatch(getNotificationsSuccess(data))
  } catch (err) {
    dispatch(setListState(FeatureState.Error))
  }
}

const inspectNotification = (id: string): AppThunk => async dispatch => {
  dispatch(setItemState(FeatureState.Loading))
  try {
    dispatch(inspectNotificationSuccess(id))
  } catch (err) {
    dispatch(setItemState(FeatureState.Error))
  }
}

export const notificationReducer = notificationSlice.reducer

export const notificationActions = {
  getNotifications,
  resetNotification,
  inspectNotification
}
