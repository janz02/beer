import { RootState } from 'app/rootReducer'
import {
  PartnerContactsState,
  PartnerContactsSliceActions,
  partnerContactsSlice
} from './partnerContactsSliceFactory'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

interface PartnerContactsRoutes {
  root: string
}

interface UseReusablePartnerContactsUtils {
  route: PartnerContactsRoutes
  actions: PartnerContactsSliceActions
  selector: (state: RootState) => PartnerContactsState
}
export const useReusablePartnerContacts = (): UseReusablePartnerContactsUtils => {
  const dispatch = useDispatch()
  const { partnerId } = useParams()
  const actions = partnerContactsSlice.actions

  const utils: UseReusablePartnerContactsUtils = useMemo(() => {
    dispatch(actions.setListConstraints({ partnerId }))
    return {
      route: {
        root: `/partners/${partnerId}`
      },
      actions,
      selector: (s: RootState) => s.partnerContacts
    }
  }, [actions, dispatch, partnerId])

  return utils
}
