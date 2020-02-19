import React, { FC, useState } from 'react'
import { NewsLetterEditor, NewsLetterTemplate } from './NewsLetterEditor'
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary'
import { Button } from 'antd'

export const NewsLetterEditorPage: FC = () => {
  const [count, setCount] = useState(1)
  const [template, setTemplate] = useState<NewsLetterTemplate>({
    html: `<div>...template...</div>`,
    css: null,
    components: null,
    style: null
  })
  return (
    <>
      {/* <Button
        onClick={() => {
          setCount(count + 1)
          setTemplate({ ...template, html: `<div>...template ${count} ...</div>` })
        }}
      >
        Update
      </Button> */}
      <ErrorBoundary>
        <NewsLetterEditor template={template} />
      </ErrorBoundary>
    </>
  )
}
