import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useNewsletterEditorModals } from './useNewsletterEditorModals'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { NewsletterTemplateContentState as ContentState } from '../newsletterEditorSlice'

export const NewsletterDiscardPopup: FC = () => {
  const { t } = useTranslation()
  const { discardPopupProps, templateContentState } = useNewsletterEditorModals()

  return (
    <>
      <NavigationAlert when={templateContentState === ContentState.Modified} />
      <GenericPopup {...discardPopupProps}>
        {t('newsletter.popup.preview-discard-msg')}
      </GenericPopup>
    </>
  )
}
