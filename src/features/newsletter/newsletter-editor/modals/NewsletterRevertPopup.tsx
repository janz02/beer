import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { UseNewsletterEditorModalsUtils } from './useNewsletterEditorModals'
import { useTranslation } from 'react-i18next'

interface NewsletterRevertPopupProps {
  newsletterEditorModalsUtils: UseNewsletterEditorModalsUtils
}

export const NewsletterRevertPopup: FC<NewsletterRevertPopupProps> = props => {
  const { t } = useTranslation()
  const { revertPopupProps } = props.newsletterEditorModalsUtils

  return <GenericPopup {...revertPopupProps}>{t('newsletter.popup.restore-msg')}</GenericPopup>
}
