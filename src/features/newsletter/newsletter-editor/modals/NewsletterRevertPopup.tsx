import React, { FC } from 'react'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useNewsletterEditorModals } from './useNewsletterEditorModals'
import { useTranslation } from 'react-i18next'

export const NewsletterRevertPopup: FC = () => {
  const { t } = useTranslation()
  const { revertPopupProps } = useNewsletterEditorModals()

  return <GenericPopup {...revertPopupProps}>{t('newsletter.popup.restore-msg')}</GenericPopup>
}
