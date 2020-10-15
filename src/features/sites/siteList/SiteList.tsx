import React, { FC, useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { SiteFeatureConfig, useSiteListUtils } from './useSiteListUtils'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ExportButton } from 'components/buttons/ExportButton'

interface SiteListProps {
  config: SiteFeatureConfig
  partnerEditorPage?: boolean
  partnerId: number
}

export const SiteList: FC<SiteListProps> = props => {
  const { shrinks } = props.config
  const { t } = useTranslation()
  const {
    tableProps,
    handleGetSites,
    handleAdd,
    deletePopupProps,
    siteToDelete,
    resetFilters,
    handleExport
  } = useSiteListUtils({
    config: props.config,
    partnerId: props.partnerId,
    partnerEditorPage: props.partnerEditorPage
  })

  useEffect(() => {
    handleGetSites()
  }, [handleGetSites])

  const headerOptions = (
    <>
      <ExportButton onClick={handleExport} />
      <ResetFiltersButton onClick={resetFilters} />
      {props.config.canEdit && <AddButton onClick={handleAdd}>{t('site-list.add')}</AddButton>}
    </>
  )

  return (
    <>
      <ResponsiveCard
        disableAutoScale={shrinks}
        forTable
        floatingTitle={t('site-list.list-title')}
        floatingOptions={headerOptions}
      >
        <ResponsiveTable {...tableProps} />
      </ResponsiveCard>
      <GenericPopup {...deletePopupProps}>
        <h4>{siteToDelete?.data?.name}</h4>
        <p>{siteToDelete?.data?.address}</p>
      </GenericPopup>
    </>
  )
}
