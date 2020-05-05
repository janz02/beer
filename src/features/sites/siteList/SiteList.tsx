import React, { FC, useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useSiteList } from './useSiteList'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { SiteFeatureConfig } from './siteListSlice'
import { GenericPopup } from 'components/popups/GenericPopup'

interface SiteListProps {
  config: SiteFeatureConfig
}
export const SiteList: FC<SiteListProps> = props => {
  const { shrinks } = props.config
  const { t } = useTranslation()
  const { tableProps, handleGetSites, handleAdd, deletePopupProps, siteToDelete } = useSiteList({
    config: props.config
  })

  useEffect(() => {
    handleGetSites()
  }, [handleGetSites])

  const headerOptions = <AddButton onClick={handleAdd}>{t('site-list.add')}</AddButton>

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
