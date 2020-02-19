import React, { FC } from 'react'
import { Layout } from 'antd'
import './layout.scss'
import { LanguageSelector } from 'components/LanguageSelector'

export const PublicLayout: FC = ({ children }) => {
  return (
    <Layout className="layout public-layout">
      <div className="language-selector-container">
        <LanguageSelector />
      </div>
      <Layout>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  )
}
