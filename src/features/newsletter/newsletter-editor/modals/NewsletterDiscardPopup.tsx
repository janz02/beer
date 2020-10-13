import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { NewsletterEditorModalUtils } from './useNewsletterEditorModalUtils'
import { useTranslation } from 'react-i18next'
import { NavigationAlert } from 'components/popups/NavigationAlert'
import { NewsletterTemplateContentState as ContentState } from '../newsletterEditorSlice'

interface NewsletterDiscardPopupProps {
  newsletterEditorModalUtils: NewsletterEditorModalUtils
}

export const NewsletterDiscardPopup: FC<NewsletterDiscardPopupProps> = props => {
  const { t } = useTranslation()
  const { discardPopupProps, templateContentState } = props.newsletterEditorModalUtils

  return (
    <>
      <NavigationAlert when={templateContentState === ContentState.Modified} />
      <GenericPopup {...discardPopupProps}>
        {t('newsletter.popup.preview-discard-msg')}
      </GenericPopup>
    </>
  )
}
