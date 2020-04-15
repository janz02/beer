import React, { useEffect, FC } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { ProfileEditorFormProps, ProfileEditorForm } from './ProfileEditorForm'
import { getMyPartner } from 'features/partners/selfPartner/selfPartnerSlice'
import { changePassword } from 'features/auth/authSlice'
import { FeatureState } from 'models/featureState'
import { profileActions } from './profileSlice'

export const ProfileEditorPage: FC = () => {
  const dispatch = useDispatch()
  const { partner } = useSelector((state: RootState) => state.selfPartner)
  const { profile, featureState, editable } = useSelector((state: RootState) => state.profile)
  const loading = featureState === FeatureState.Loading

  useEffect(() => {
    dispatch(profileActions.getProfile())
  }, [dispatch])

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch])

  const handleProfileSave = (values: any): void => {
    dispatch(profileActions.updateProfile({ ...values }))

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
