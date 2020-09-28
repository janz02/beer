import React, { FC } from 'react'
import { SiteEditorForm } from './site/SiteEditorForm'
import { CashierManager } from './cashiers/CashierManager'
import { siteListPageConfig } from '../siteList/SitesListPage'

export const SiteEditorPage: FC = () => {
  return (
    <>
      <SiteEditorForm config={siteListPageConfig} />
      <CashierManager config={siteListPageConfig} />
    </>
  )
}
