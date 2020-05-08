import React, { FC } from 'react'
import { Layout } from 'antd'
import './layout.scss'
import { LanguageSelector } from 'components/LanguageSelector'
import { AppVersion } from 'components/layout/AppVersion'

export const PublicLayout: FC = ({ children }) => {
  return (
    <Layout className="layout public-layout">
      <div className="language-selector-container">
        <LanguageSelector public />
      </div>
      <Layout>
        <Layout.Content>
          {children}
          <AppVersion />
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
