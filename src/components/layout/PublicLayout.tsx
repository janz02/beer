import React, { FC } from 'react'
import { Layout } from 'antd'
import './layout.scss'

export const PublicLayout: FC = ({ children }) => {
  return (
    <Layout className="layout">
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
