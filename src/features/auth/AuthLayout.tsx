import React, { FC } from 'react'
import './AuthLayout.scss'
import Logo from 'assets/img/logo.svg'
import { Layout, Card, Typography } from 'antd'
import { useIsMobile } from 'hooks'

const { Title } = Typography
interface AuthLayoutProps {
  title: string
  className?: string
}

export const AuthLayout: FC<AuthLayoutProps> = props => {
  const { title, className, children } = props
  const isMobile = useIsMobile()

  return (
    <Layout.Content>
      <Card
        className={`auth ${isMobile ? 'auth--mobile' : ''}`}
        title={<img src={Logo} alt="Logo" title="Logo" />}
      >
        <Title level={4}>{title}</Title>
        <div className={className ?? ''}>{children}</div>
      </Card>
    </Layout.Content>
  )
}
