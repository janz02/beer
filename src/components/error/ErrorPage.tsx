import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button, Result } from 'antd'
import './ErrorPage.scss'
import { history } from 'router/router'
import { useTranslation } from 'react-i18next'
import { isLoggedIn } from 'services/jwt-reader'

export const ErrorPage: FC = () => {
  const { type } = useParams()
  const { t } = useTranslation()

  const content = useMemo(() => {
    switch (type) {
      case '403':
        return {
          title: '403',
          subtitle: t('error-page.message.403')
        }
      default:
        return {
          title: t('error-page.message.default')
        }
    }
  }, [t, type])

  const onBack = (): void => {
    if (!isLoggedIn()) {
      history.replace('/auth')
      return
    }
    history.replace('/')
  }

  return (
    <Card className="error-card">
      <Result
        status="error"
        title={content.title}
        subTitle={content.subtitle}
        extra={
          <Button type="primary" onClick={onBack}>
            {t('error-page.back')}
          </Button>
        }
      />
    </Card>
  )
}
