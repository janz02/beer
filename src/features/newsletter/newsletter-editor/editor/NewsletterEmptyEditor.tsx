import './NewsletterEmptyEditor.scss'
import React, { FC } from 'react'
import { Spin, Result, Button } from 'antd'
import { FeatureState } from 'models/featureState'
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { UseNewsletterEditorHandlersUtils } from './useNewsletterEditorHandlers'

interface NewsletterEmptyEditorProps {
  newsletterEditorHandlers: UseNewsletterEditorHandlersUtils
}

export const NewsletterEmptyEditor: FC<NewsletterEmptyEditorProps> = props => {
  const { t } = useTranslation()

  const { templateState, handleExitEditor, handleGetTemplate } = props.newsletterEditorHandlers

  return (
    <>
      <Spin
        className="nl-editor-spinner"
        spinning={templateState === FeatureState.Loading}
        size="large"
      />

      {templateState === FeatureState.Error && (
        <Result
          status="warning"
          title={t('newsletter.fail-msg')}
          extra={
            <>
              <Button onClick={handleExitEditor}>
                <ArrowLeftOutlined />
                {t('common.go-back-to-list')}
              </Button>
              <Button onClick={handleGetTemplate}>
                <ReloadOutlined />
                {t('common.try-again')}
              </Button>
            </>
          }
        />
      )}
    </>
  )
}
