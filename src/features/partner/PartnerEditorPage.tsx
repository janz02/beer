import React, { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { getMyPartner, updateMyPartner } from './partnerSlice'
import { PartnerEditorFormProps, PartnerEditorForm } from './PartnerEditorForm'
import { Partner } from 'models/partner'

export const PartnerEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { partner, loading } = useSelector((state: RootState) => state.partner)

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

  const handlePartnerSave = (partner: Partner): void => {
    dispatch(updateMyPartner({ ...partner }))
  }

  const props: PartnerEditorFormProps = {
    handlePartnerSave,
    loading,
    partner
  }

  return <PartnerEditorForm {...props} />
}
