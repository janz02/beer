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
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/models'
import { UserType } from 'models/user'

interface PartnerContactsRoutes {
  root: string
  detail: string
}

interface PartnerContactsPermissions {
  editor: boolean
}

interface PartnerContactsLabel {
  listTitle: string
}

interface UseReusablePartnerContactsUtils {
  shrinks: boolean
  permission: PartnerContactsPermissions
  route: PartnerContactsRoutes
  label: PartnerContactsLabel
  actions: PartnerContactsSliceActions
  userType: UserType
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
        userType: +partnerId! === 1 ? UserType.NKM : UserType.PARTNER,
        shrinks: true,
        permission: {
          editor: hasPermission([Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager])
        },
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
      userType: UserType.PARTNER,
      shrinks: false,
      label: { listTitle: t('partner-contact.list-title') },
      permission: {
        // TODO Fix for PartnerContact.MajorPartner on JWT
        editor: hasPermission([Roles.PartnerContactApprover])
      },
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
