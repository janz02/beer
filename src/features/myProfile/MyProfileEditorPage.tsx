import React, { useEffect, FC } from 'react'
import { useDispatch } from 'hooks/react-redux-hooks'
import { MyProfileEditorForm } from './MyProfileEditorForm'
import { useMyProfileUtils } from './useMyProfileUtils'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from 'components/popups/NavigationAlert'

export const MyProfileEditorPage: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const profileUtils = useMyProfileUtils()
  const { modified, getProfile, getMyPartner } = profileUtils

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch, getProfile])

  useEffect(() => {
    dispatch(getMyPartner())
  }, [dispatch, getMyPartner])

  return (
    <ResponsiveCard floatingTitle={t('my-profile.editor-title')}>
      <NavigationAlert when={modified} />
      <MyProfileEditorForm profileUtils={profileUtils} />
    </ResponsiveCard>
  )
}
