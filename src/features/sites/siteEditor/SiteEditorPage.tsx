import React, { FC } from 'react'
import { SiteEditorForm } from './site/SiteEditorForm'
import { CashierManager } from './cashiers/CashierManager'
import { getSiteListPageConfig } from '../siteList/SitesListPage'

export const SiteEditorPage: FC = () => {
  const siteListPageConfig = getSiteListPageConfig()

  return (
    <>
      <SiteEditorForm config={siteListPageConfig} />
      <CashierManager config={siteListPageConfig} />
    </>
  )
}
