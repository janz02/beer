import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment, { Moment } from 'moment'
import { AppThunk } from 'app/store'

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
  notifications: NotificationData[]
  loading: boolean
  error: string
}

const initialState: NotificationState = {
  unreadCount: 0,
  notifications: [],
  hasMore: true,
  loading: false,
  error: ''
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationsRequest(state) {
      state.loading = true
    },
    getNotificationsFail(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    getNotificationsSuccess(state, action: PayloadAction<NotificationData[]>) {
      state.notifications.unshift(...action.payload)
      state.notifications = state.notifications.sort((a, b) =>
        (a.deliveryTime as Moment).isBefore(b.deliveryTime as Moment) ? 1 : -1
      )
      state.loading = false
      // TODO - get this from api response
      state.unreadCount = 0
      state.notifications.forEach(noti => {
        state.unreadCount += +!noti.read
      })

      state.hasMore = state.notifications.length < 60
    },
    inspectNotification(state, action: PayloadAction<string>) {
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

export const {
  inspectNotification,
  getNotificationsFail,
  getNotificationsRequest,
  getNotificationsSuccess
} = notificationSlice.actions

export const notificationReducer = notificationSlice.reducer

// TODO: Only for simulating async actions, remove after API is connected
const delay = (p: any): Promise<unknown> =>
  new Promise(resolve => {
    console.log('mock api call', p)
    setTimeout(() => {
      resolve(p)
    }, 1000)
  })

export const getNotifications = (): AppThunk => async dispatch => {
  dispatch(getNotificationsRequest())
  try {
    // TODO: needs real api connection
    const data = (await delay(
      [...TEMP_DATA].map(noti => ({
        ...noti,
        id: Date.now() + `_${noti.id}_${Math.round(Math.random() * 2000)}`,
        deliveryTime: moment(noti.deliveryTime),
        description: noti.description + moment.now()
      }))
    )) as NotificationData[]
    dispatch(getNotificationsSuccess(data))
  } catch (err) {
    dispatch(getNotificationsFail(err.toString()))
  }
}
