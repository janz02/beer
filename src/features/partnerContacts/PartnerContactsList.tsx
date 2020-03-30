import React, { FC, useMemo, useState, useCallback } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTranslation } from 'react-i18next'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { PartnerContact } from 'models/partnerContact'
import { ListRequestParams, useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { AppThunk } from 'app/store'
import { ColumnType } from 'antd/lib/table'
import { CrudButtons, CrudButtonsProps } from 'components/buttons/CrudButtons'
import { GenericPopup, PopupState } from 'components/popups/GenericPopup'
import { useReusablePartnerContacts } from './useReusablePartnerContacts'
import { Roles } from 'api/swagger'

interface PartnerContactsListProps {
  loading: boolean
  contacts: PartnerContact[]
  listParams: ListRequestParams
  getListAction: (params: ListRequestParams) => AppThunk
  handleEdit: (id: number) => void
  deleteAction: (id: number, role: Roles) => AppThunk
}
export const PartnerContactsList: FC<PartnerContactsListProps> = props => {
  const { loading, contacts, listParams } = props
  const { getListAction, handleEdit, deleteAction } = props
  const { t } = useTranslation()

  const [contactToDelete, setContanctToDelete] = useState<PopupState<PartnerContact>>()

  const { label, shrinks, permission } = useReusablePartnerContacts()

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

  const crudOptions = useCallback(
    (record: PartnerContact): CrudButtonsProps => {
      const config: CrudButtonsProps = {}
      if (permission.editor) {
        config.onDelete = (): void => {
          setContanctToDelete({
            data: record,
            popupVisible: true
          })
        }
        config.onEdit = () => handleEdit(record.id!)
      } else {
        config.onView = () => handleEdit(record.id!)
      }
      return config
    },
    [handleEdit, permission.editor]
  )

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
        title: t('partner-contact.field.type'),
        key: 'majorPartner',
        filterMode: FilterMode.BOOLEAN,
        sort: true,
        width: '14rem',
        filters: [
          { text: t('partner-contact.field.partner-type.major'), value: 'true' },
          { text: t('partner-contact.field.partner-type.normal'), value: 'false' }
        ],
        render: value =>
          value
            ? t('partner-contact.field.partner-type.major')
            : t('partner-contact.field.partner-type.normal')
      }),
      columnConfig({
        title: t('partner-contact.field.active'),
        filterMode: FilterMode.BOOLEAN,
        key: 'isActive',
        width: '10rem',
        filters: [
          { text: t('partner-contact.field.status-active'), value: 'true' },
          { text: t('partner-contact.field.status-inactive'), value: 'false' }
        ],
        render: value =>
          value
            ? t(`partner-contact.field.status-active`)
            : t(`partner-contact.field.status-inactive`)
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
        render(_: unknown, record: PartnerContact) {
          return <CrudButtons {...crudOptions(record)} />
        }
      })
    ],
    [actionColumnConfig, columnConfig, crudOptions, t]
  )

  return (
    <>
      <ResponsiveCard
        disableAutoScale={shrinks}
        paddedBottom
        floatingTitle={label.listTitle}
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
        onOkAction={deleteAction?.(contactToDelete?.data?.id!, contactToDelete?.data?.role!)}
        afterClose={() => setContanctToDelete(null)}
      >
        <h4>{contactToDelete?.data?.name}</h4>
        <p>{contactToDelete?.data?.email}</p>
        <p>{contactToDelete?.data?.phone}</p>
      </GenericPopup>
    </>
  )
}
