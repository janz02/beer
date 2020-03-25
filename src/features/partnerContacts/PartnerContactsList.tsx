import React, { FC, useMemo, useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { PartnerContact } from 'models/partnerContact'
import { ListRequestParams, useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { AppThunk } from 'app/store'
import { ColumnType } from 'antd/lib/table'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { GenericPopup, PopupState } from 'components/popups/GenericPopup'
import { useReusablePartnerContacts } from './useReusablePartnerContacts'

interface PartnerContactsListProps {
  loading: boolean
  contacts: PartnerContact[]
  listParams: ListRequestParams
  getListAction: (params: ListRequestParams) => AppThunk
  handleEdit: (id: number) => void
  handleCreate: () => void
  deleteAction: (id: number) => AppThunk
}
export const PartnerContactsList: FC<PartnerContactsListProps> = props => {
  const { loading, contacts, listParams } = props
  const { getListAction, handleEdit, handleCreate, deleteAction } = props
  const { t } = useTranslation()

  const [contactToDelete, setContanctToDelete] = useState<PopupState<PartnerContact>>()

  const { label } = useReusablePartnerContacts()
  const headerOptions = (
    <AddButton onClick={handleCreate}>{t('partner-contact.list.add')}</AddButton>
  )

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<PartnerContact>({
    listParamsState: listParams,
    filterKeys: ['name', 'email', 'phone'],
    getDataAction: getListAction
  })

  const columnsConfig: ColumnType<PartnerContact>[] = useMemo(
    () => [
      columnConfig({
        title: t('partner-contact.field.name'),
        key: 'name',
        width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('partner-contact.field.major-partner'),
        key: 'majorPartner',
        sort: true,
        width: '10rem',
        render: value => (value ? t('common.yes') : t('common.no'))
      }),
      columnConfig({
        title: t('partner-contact.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('partner-contact.field.phone'),
        key: 'phone',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        render(value: unknown, record: PartnerContact) {
          return (
            <>
              <CrudButtons
                onEdit={() => record.id && handleEdit(record.id)}
                onDelete={() => {
                  setContanctToDelete({
                    data: record,
                    popupVisible: true
                  })
                }}
              />
            </>
          )
        }
      })
    ],
    [actionColumnConfig, columnConfig, handleEdit, t]
  )

  return (
    <>
      <ResponsiveCard
        disableAutoScale
        paddedBottom
        floatingTitle={label.listTitle}
        floatingOptions={headerOptions}
        forTable
      >
        <ResponsiveTable
          {...{
            loading,
            columns: columnsConfig,
            dataSource: addKeyProp(contacts),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>
      <GenericPopup
        type="delete"
        id={contactToDelete?.data?.id!}
        visible={!!contactToDelete?.popupVisible}
        onCancel={() => setContanctToDelete({ ...contactToDelete, popupVisible: false })}
        onOkAction={deleteAction?.(contactToDelete?.data?.id!)}
        afterClose={() => setContanctToDelete(null)}
      >
        <h4>{contactToDelete?.data?.name}</h4>
        <p>{contactToDelete?.data?.email}</p>
        <p>{contactToDelete?.data?.phone}</p>
      </GenericPopup>
    </>
  )
}
