import React, { FC } from 'react'
import { NewsletterEditor } from './editor/NewsletterEditor'
import { NewsletterSegmentEmailModal } from './modals/NewsletterSegmentEmailModal'
import { NewsletterTestEmailModal } from './modals/NewsletterTestEmailModal'
import { NewsletterRevertPopup } from './modals/NewsletterRevertPopup'
import { NewsletterDiscardPopup } from './modals/NewsletterDiscardPopup'
import { NewsletterEmptyEditor } from './editor/NewsletterEmptyEditor'
import { useNewsletterEditorModalUtils } from './modals/useNewsletterEditorModalUtils'
import { useNewsletterEditorHandlerUtils } from './editor/useNewsletterEditorHandlerUtils'

export const NewsletterEditorPage: FC = () => {
  const newsletterEditorModalUtils = useNewsletterEditorModalUtils()
  const newsletterEditorHandlerUtils = useNewsletterEditorHandlerUtils()

  return (
    <>
      <NewsletterEditor newsletterEditorHandlerUtils={newsletterEditorHandlerUtils} />
      <NewsletterEmptyEditor newsletterEditorHandlerUtils={newsletterEditorHandlerUtils} />
      <NewsletterSegmentEmailModal newsletterEditorModalUtils={newsletterEditorModalUtils} />
      <NewsletterTestEmailModal newsletterEditorModalUtils={newsletterEditorModalUtils} />
      <NewsletterRevertPopup newsletterEditorModalUtils={newsletterEditorModalUtils} />
      <NewsletterDiscardPopup newsletterEditorModalUtils={newsletterEditorModalUtils} />
    </>
  )
}
