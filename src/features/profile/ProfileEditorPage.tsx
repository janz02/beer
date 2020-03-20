import React, { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { getProfile, updateProfile } from './profileSlice'
import { ProfileEditorFormProps, ProfileEditorForm } from './ProfileEditorForm'
import { getMyPartner } from 'features/partners/selfPartner/selfPartnerSlice'
import { changePassword } from 'features/auth/authSlice'

export const ProfileEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { partner } = useSelector((state: RootState) => state.selfPartner)
  const { profile, loading, editable } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

  const handleProfileSave = (values: any): void => {
    dispatch(updateProfile({ ...values }))

    const password = values.password
    const oldPassword = values.oldPassword
    if (password && oldPassword) {
      dispatch(changePassword(password, oldPassword))
    }
  }

  const props: ProfileEditorFormProps = {
    handleProfileSave,
    loading,
    profile,
    editable,
    partner
  }

  return <ProfileEditorForm {...props} />
}
