import React, { useEffect, FC } from 'react'
import { useDispatch } from 'hooks/react-redux-hooks'
import { ProfileEditorForm } from './ProfileEditorForm'
import { useProfile } from './useProfile'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from 'components/popups/NavigationAlert'

export const ProfileEditorPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { modified, getProfile, getMyPartner } = useProfile()

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch, getProfile])

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch, getMyPartner])

  return (
    <ResponsiveCard floatingTitle={t('profile.editor-title')}>
      <NavigationAlert when={modified} />
      <ProfileEditorForm />
    </ResponsiveCard>
  )
}
