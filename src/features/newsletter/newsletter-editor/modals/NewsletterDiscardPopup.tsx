import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { UseNewsletterEditorModalsUtils } from './useNewsletterEditorModals'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { NewsletterTemplateContentState as ContentState } from '../newsletterEditorSlice'

interface NewsletterDiscardPopupProps {
  newsletterEditorModalsUtils: UseNewsletterEditorModalsUtils
}

export const NewsletterDiscardPopup: FC<NewsletterDiscardPopupProps> = props => {
  const { t } = useTranslation()
  const { discardPopupProps, templateContentState } = props.newsletterEditorModalsUtils

  return (
    <>
      <NavigationAlert when={templateContentState === ContentState.Modified} />
      <GenericPopup {...discardPopupProps}>
        {t('newsletter.popup.preview-discard-msg')}
      </GenericPopup>
    </>
  )
}
