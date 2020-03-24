import React, { FC } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { history } from 'router/router'

interface PartnerContactsListProps {}
export const PartnerContactsList: FC<PartnerContactsListProps> = props => {
  const {} = props
  const { t } = useTranslation()

  const headerOptions = (
    <AddButton onClick={() => history.push(`/partners/new`)}>
      {t('partner-contact.list.add')}
    </AddButton>
  )

  return (
    <ResponsiveCard
      disableAutoScale
      paddedBottom
      floatingTitle={t('partner.list.title')}
      floatingOptions={headerOptions}
      forTable
    >
      <ResponsiveTable
        {
          ...{
            // loading,
            // columns: columnsConfig,
            // dataSource: partners.map((t, i) => ({ ...t, key: '' + i + t.id })),
            // pagination: paginationConfig,
            // onChange: handleTableChange
          }
        }
      />
    </ResponsiveCard>
  )
}
