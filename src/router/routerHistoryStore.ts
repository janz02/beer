import { notification } from 'antd'
import { AppThunk } from 'app/store'

const initialState = {
  cameFrom: '/auth'
}

type RouteHistory = typeof initialState

export const routerHistoryStore = (state = { ...initialState }, action: any): RouteHistory => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      notification.destroy()
      const pathname: string = action.payload.location.pathname
      return {
        cameFrom: pathname.startsWith('/auth') ? state.cameFrom : pathname
      }
    }
    case 'routerHistory/resetRouterHistory': {
      return { ...initialState }
    }
    default:
      return state
  }
}

export const resetRouterHistory = (): AppThunk => async dispatch => {
  dispatch({ type: 'routerHistory/resetRouterHistory' })
}
