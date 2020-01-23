import React, { useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { getProfiles, updateProfiles } from './profileSlice'
import { ProfileEditorFormProps, ProfileEditorForm } from './ProfileEditorForm'
import { Profile } from 'models/profile'

export const ProfileEditorPage: React.FC = () => {
  const dispatch = useDispatch()

  const { profile, loading } = useSelector((state: RootState) => state.profile)

  useEffect(() => {
    dispatch(getProfiles())
  }, [dispatch])

  const handleProfileSave = (profile: Profile): void => {
    dispatch(updateProfiles({ ...profile }))
  }

  const props: ProfileEditorFormProps = {
    handleProfileSave,
    loading,
    profile
  }

  return (
    <>
      <ProfileEditorForm {...props} />
    </>
  )
}
