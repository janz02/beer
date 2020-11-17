import { Empty } from 'antd'
import React from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'

export const PlaceholderPage: React.FC = () => {
  const { t } = useTranslation()

  return (
    <ResponsiveCard floatingTitle={t('placeholder.title')}>
      <Empty description={t('placeholder.description')} />
    </ResponsiveCard>
  )
}
