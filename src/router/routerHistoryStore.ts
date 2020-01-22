const initialState = {
  cameFrom: '/'
}

type RouteHistory = typeof initialState

export const routerHistoryStore = (state = { ...initialState }, action: any): RouteHistory => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      const pathname: string = action.payload.location.pathname
      return {
        cameFrom: pathname.startsWith('/auth') ? state.cameFrom : pathname
      }
    }
    default:
      return state
  }
}
