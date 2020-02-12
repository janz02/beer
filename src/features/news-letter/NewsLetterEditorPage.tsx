import React, { FC } from 'react'
import { NewsLetterEditor } from './NewsLetterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'

export const NewsLetterEditorPage: FC = () => {
  return (
    <>
      <ErrorBoundary>
        <NewsLetterEditor />
      </ErrorBoundary>
    </>
  )
}
