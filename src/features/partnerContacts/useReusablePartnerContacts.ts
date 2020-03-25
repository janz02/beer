import { RootState } from 'app/rootReducer'
import {
  PartnerContactsState,
  PartnerContactsSliceActions,
  partnerContactsSlice,
  contactsSlice
} from './partnerContactsSliceFactory'
import { useParams } from 'hooks/react-router-dom-hooks'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { useSelector } from 'hooks/react-redux-hooks'
import { useTranslation } from 'react-i18next'

interface PartnerContactsRoutes {
  root: string
  detail: string
}

interface PartnerContactsLabel {
  listTitle: string
}

interface UseReusablePartnerContactsUtils {
  shrinks: boolean
  route: PartnerContactsRoutes
  label: PartnerContactsLabel
  actions: PartnerContactsSliceActions
  selector: (state: RootState) => PartnerContactsState
}
export const useReusablePartnerContacts = (): UseReusablePartnerContactsUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { partnerId } = useParams()
  const { pathname } = useSelector((state: RootState) => state.router.location)
  const selfPartnerId = useSelector((state: RootState) => state.auth.userData.partnerId)

  const utils = useMemo((): UseReusablePartnerContactsUtils => {
    if (pathname.startsWith('/partners') && partnerId) {
      const actions = partnerContactsSlice.actions
      dispatch(actions.setListConstraints({ partnerId }))
      return {
        shrinks: true,
        label: { listTitle: t('partner.contacts.list-title') },
        route: {
          root: `/partners/${partnerId}`,
          detail: `/contact`
        },
        actions,
        selector: (s: RootState) => s.partnerContacts
      }
    }
    const actions = contactsSlice.actions
    dispatch(actions.setListConstraints({ partnerId: selfPartnerId }))
    return {
      shrinks: false,
      label: { listTitle: t('partner-contact.list-title') },
      route: {
        root: `/contacts`,
        detail: ``
      },
      actions: contactsSlice.actions,
      selector: (s: RootState) => s.contacts
    }
  }, [dispatch, partnerId, pathname, selfPartnerId, t])

  return utils
}
