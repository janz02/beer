import React, { FC, useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { usePartnerContactList } from './usePartnerContactList'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useTranslation } from 'react-i18next'
import { PartnerContactConfig } from '../PartnerContactTile'
import { Button } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import { ResetFiltersButton } from 'components/ResetFiltersButton'

export interface PartnerContactListProps {
  config: PartnerContactConfig
}

export const PartnerContactList: FC<PartnerContactListProps> = props => {
  const { shrinks } = props.config
  const { t } = useTranslation()

  const {
    contactToDelete,
    handleGetList,
    tableProps,
    deletePopupProps,
    handleOpenInviter,
    resetFilters
  } = usePartnerContactList({
    config: props.config
  })

  useEffect(() => {
    handleGetList()
  }, [handleGetList])

  const options = (
    <>
      <ResetFiltersButton onClick={resetFilters} />
      <Button type="primary" icon={<UserAddOutlined />} size="large" onClick={handleOpenInviter}>
        {t('partner-contact.send-invitation')}
      </Button>
    </>
  )

  return (
    <>
      <ResponsiveCard
        disableAutoScale={shrinks}
        paddedBottom
        floatingTitle={t('partner-contact.list-title')}
        floatingOptions={options}
        forTable
      >
        <ResponsiveTable {...tableProps} />
      </ResponsiveCard>
      <GenericPopup {...deletePopupProps}>
        <h4>{contactToDelete?.data?.name}</h4>
        <p>{contactToDelete?.data?.email}</p>
        <p>{contactToDelete?.data?.phone}</p>
      </GenericPopup>
    </>
  )
}
