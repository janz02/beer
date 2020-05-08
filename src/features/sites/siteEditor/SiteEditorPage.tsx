import React, { FC } from 'react'
import { SiteEditorForm } from './site/SiteEditorForm'
import { CashierManager } from './cashiers/CashierManager'

export const SiteEditorPage: FC = () => {
  return (
    <>
      <SiteEditorForm />
      <CashierManager />
    </>
  )
}
