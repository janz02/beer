import React, { FC, useState } from 'react'
import { NewsLetterEditor } from './NewsLetterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'

export const NewsLetterEditorPage: FC = () => {
  const [template] = useState(
    `<div style="box-sizing: border-box; text-align: center; text-decoration: underline; font-style: italic;">...template...</div>`
  )
  return (
    <ErrorBoundary>
      <NewsLetterEditor template={template} />
    </ErrorBoundary>
  )
}
