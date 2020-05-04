import { useMemo } from 'react'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useParams } from 'react-router-dom'
import { PartnerContactListProps } from './list/PartnerContactList'
import { PartnerContactEditorProps } from './modal/editor/PartnerContactEditor'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/models'
import { partnerContactModalActions } from './modal/partnerContactModalSlice'
import { UserType } from 'models/user'

interface UsePartnerContactTileUtils {
  listProps: PartnerContactListProps
  editorProps: PartnerContactEditorProps
}
export const usePartnerContactTile = (): UsePartnerContactTileUtils => {
  const { contactId } = useParams()
  const dispatch = useDispatch()

  const { pathname } = useSelector((state: RootState) => state.router.location)
  const { partnerId } = useParams()
  const { partnerId: selfPartnerId } = useSelector((state: RootState) => state.auth.userData)

  const editorModalUtils = useGenericModalFormEditorUtils({
    dataId: contactId,
    rootRoute: 'contacts',
    detailRoute: '',
    disableCreate: true
  })

  const routeBasedConfig = useMemo(() => {
    if (pathname.startsWith('/partners') && partnerId) {
      return {
        shrinks: true,
        userType: +partnerId! === 1 ? UserType.NKM : UserType.PARTNER,
        canEdit: hasPermission([Roles.Administrator, Roles.CampaignManager, Roles.PartnerManager]),
        listConstraint: { partnerId }
      }
    } else {
      return {
        shrinks: false,
        userType: UserType.PARTNER,
        canEdit: hasPermission([Roles.PartnerContactApprover]),
        listConstraint: { partnerId: selfPartnerId }
      }
    }
  }, [pathname, partnerId, selfPartnerId])

  const listProps: PartnerContactListProps = {
    ...routeBasedConfig,
    handleEdit: (id: number) => dispatch(partnerContactModalActions.inspectContact(id))
  }

  const editorProps: PartnerContactEditorProps = {
    ...routeBasedConfig,
    params: editorModalUtils.editorParams
  }

  return { listProps, editorProps }
}
