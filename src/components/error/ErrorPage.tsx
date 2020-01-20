import React, { FC, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button } from 'antd'
import './error.scss'
import { history } from 'router/router'
import { useTranslation } from 'react-i18next'

export const ErrorPage: FC = () => {
  const { type } = useParams()

  const { t } = useTranslation()

  const content = useMemo(() => {
    switch (type) {
      case '404':
        return {
          title: 'error-page.title404'
        }

      default:
        return {
          title: 'error-page.title'
        }
    }
  }, [type])

  return (
    <Card className="error-card" title={t(content.title)}>
      <Button onClick={() => history.push('/')}>{t('error-page.back')}</Button>
    </Card>
  )
}
