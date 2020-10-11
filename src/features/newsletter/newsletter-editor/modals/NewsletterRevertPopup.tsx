import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { NewsletterEditorModalUtils } from './useNewsletterEditorModalUtils'
import { useTranslation } from 'react-i18next'

interface NewsletterRevertPopupProps {
  newsletterEditorModalUtils: NewsletterEditorModalUtils
}

export const NewsletterRevertPopup: FC<NewsletterRevertPopupProps> = props => {
  const { t } = useTranslation()
  const { revertPopupProps } = props.newsletterEditorModalUtils

  return <GenericPopup {...revertPopupProps}>{t('newsletter.popup.restore-msg')}</GenericPopup>
}
