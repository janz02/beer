import React, { FC } from 'react'
import { SiteEditorForm } from './site/SiteEditorForm'
import { CashierManager } from './cashiers/CashierManager'
import { SiteFeatureConfig } from '../siteList/useSiteList'

export const SiteEditorPage: FC<{ config: SiteFeatureConfig }> = ({ config }) => {
  return (
    <>
      <SiteEditorForm config={config} />
      <CashierManager config={config} />
    </>
  )
}
