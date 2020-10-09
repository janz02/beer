import React, { FC } from 'react'
import { NewsletterEditor } from './editor/NewsletterEditor'
import { NewsletterSegmentEmailModal } from './modals/NewsletterSegmentEmailModal'
import { NewsletterTestEmailModal } from './modals/NewsletterTestEmailModal'
import { NewsletterRevertPopup } from './modals/NewsletterRevertPopup'
import { NewsletterDiscardPopup } from './modals/NewsletterDiscardPopup'
import { NewsletterEmptyEditor } from './editor/NewsletterEmptyEditor'
import { useNewsletterEditorModals } from './modals/useNewsletterEditorModals'
import { useNewsletterEditorHandlers } from './editor/useNewsletterEditorHandlers'

export const NewsletterEditorPage: FC = () => {
  const newsletterEditorModalsUtils = useNewsletterEditorModals()
  const newsletterEditorHandlers = useNewsletterEditorHandlers()

  return (
    <>
      <NewsletterEditor newsletterEditorHandlers={newsletterEditorHandlers} />
      <NewsletterEmptyEditor newsletterEditorHandlers={newsletterEditorHandlers} />
      <NewsletterSegmentEmailModal newsletterEditorModalsUtils={newsletterEditorModalsUtils} />
      <NewsletterTestEmailModal newsletterEditorModalsUtils={newsletterEditorModalsUtils} />
      <NewsletterRevertPopup newsletterEditorModalsUtils={newsletterEditorModalsUtils} />
      <NewsletterDiscardPopup newsletterEditorModalsUtils={newsletterEditorModalsUtils} />
    </>
  )
}
