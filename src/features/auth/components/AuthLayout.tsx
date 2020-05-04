import React, { FC } from 'react'
import { ReactComponent as Logo } from 'assets/img/logo.svg'
import { Layout, Card, Typography } from 'antd'
import styles from './AuthLayout.module.scss'

interface AuthLayoutProps {
  title: string
}

export const AuthLayout: FC<AuthLayoutProps> = props => {
  const { title, children } = props
  const { Title } = Typography

  return (
    <Layout.Content>
      <Card className={styles.auth} title={<Logo className={styles.logo} />}>
        <Title level={4}>{title}</Title>
        <div>{children}</div>
      </Card>
    </Layout.Content>
  )
}
