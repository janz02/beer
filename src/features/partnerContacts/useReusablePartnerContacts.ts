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
import { ResponsiveCardWidth } from 'components/responsive/ResponsiveCard'

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
  editedContactId: string | undefined
  editingSelf: boolean
  shrinks: boolean
  permission: PartnerContactsPermissions
  route: PartnerContactsRoutes
  label: PartnerContactsLabel
  actions: PartnerContactsSliceActions
  listWidth: ResponsiveCardWidth
  userType: UserType
  selector: (state: RootState) => PartnerContactsState
}
export const useReusablePartnerContacts = (): UseReusablePartnerContactsUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { partnerId, contactId } = useParams()
  const { pathname } = useSelector((state: RootState) => state.router.location)
  const { partnerId: selfPartnerId, id: selfUserId } = useSelector(
    (state: RootState) => state.auth.userData
  )

  const utils = useMemo((): UseReusablePartnerContactsUtils => {
    const common = {
      editedContactId: contactId,
      editingSelf: contactId && selfUserId ? +contactId === selfUserId : false
    }
    if (pathname.startsWith('/partners') && partnerId) {
      const actions = partnerContactsSlice.actions
      dispatch(actions.setListConstraints({ partnerId }))
      return {
        ...common,
        // TODO: remove this id checking
        userType: +partnerId! === 1 ? UserType.NKM : UserType.PARTNER,
        shrinks: true,
        listWidth: 'normal',
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
      ...common,
      editedContactId: contactId,
      userType: UserType.PARTNER,
      shrinks: false,
      listWidth: 'normal',
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
  }, [contactId, dispatch, partnerId, pathname, selfPartnerId, selfUserId, t])

  return utils
}
