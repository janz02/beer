import React, { FC } from 'react'
import { NewsletterEditor } from './editor/NewsletterEditor'
import { NewsletterSegmentEmailModal } from './modals/NewsletterSegmentEmailModal'
import { NewsletterTestEmailModal } from './modals/NewsletterTestEmailModal'
import { NewsletterRevertPopup } from './modals/NewsletterRevertPopup'
import { NewsletterDiscardPopup } from './modals/NewsletterDiscardPopup'
import { NewsletterEmptyEditor } from './editor/NewsletterEmptyEditor'

export const NewsletterEditorPage: FC = () => {
  return (
    <>
      <NewsletterEditor />
      <NewsletterEmptyEditor />
      <NewsletterSegmentEmailModal />
      <NewsletterTestEmailModal />
      <NewsletterRevertPopup />
      <NewsletterDiscardPopup />
    </>
  )
}
