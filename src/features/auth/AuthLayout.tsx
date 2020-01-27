import React, { FC } from 'react'
import { Layout, Card } from 'antd'
import { useIsMobile } from 'hooks'
import './AuthLayout.scss'

interface AuthLayoutProps {
  title: string
  className?: string
}

export const AuthLayout: FC<AuthLayoutProps> = props => {
  const { title, className, children } = props
  const isMobile = useIsMobile()

  return (
    <Layout.Content>
      <Card title={title} className={`auth-card ${isMobile ? 'auth-card--mobile' : ''}`}>
        <div className={className ?? ''}>{children}</div>
      </Card>
    </Layout.Content>
  )
}
