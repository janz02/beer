import React, { FC, useEffect } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { usePartnerContactList } from './usePartnerContactList'
import { GenericPopup } from 'components/popups/GenericPopup'
import { useTranslation } from 'react-i18next'
import { PartnerContactConfig } from '../PartnerContactTile'

export interface PartnerContactListProps {
  config: PartnerContactConfig
  // shrinks: boolean
  // userType: UserType
  // listConstraint: ListRequestParams
  // canEdit: boolean
  // handleEdit: (id: number) => void
}

export const PartnerContactList: FC<PartnerContactListProps> = props => {
  const { shrinks } = props.config
  const { t } = useTranslation()

  const { contactToDelete, handleGetList, tableProps, deletePopupProps } = usePartnerContactList({
    listProps: props
  })

  useEffect(() => {
    handleGetList()
  }, [handleGetList])

  return (
    <>
      <ResponsiveCard
        disableAutoScale={shrinks}
        paddedBottom
        floatingTitle={t('partner-contact.list-title')}
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
