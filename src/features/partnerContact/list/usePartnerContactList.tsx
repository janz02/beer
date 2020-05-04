import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { partnerContactListActions } from './partnerContactListSlice'
import { ListRequestParams, useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { PartnerContact } from 'models/partnerContact'
import { RootState } from 'app/rootReducer'
import { ColumnType } from 'antd/lib/table'
import { UserType } from 'models/user'
import { CrudButtons, CrudButtonsProps } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { FeatureState } from 'models/featureState'
import { PartnerContactListProps } from './PartnerContactList'
import { useRoleGenerator } from 'hooks/useRoleGenerator'

interface UsePartnerContactListProps {
  listProps: PartnerContactListProps
}
interface UsePartnerContactListUtils {
  tableProps: ResponsiveTableProps
  contactToDelete: PopupState<PartnerContact> | undefined | null
  deletePopupProps: GenericPopupProps
  handleGetList: (params?: ListRequestParams) => void
}
export const usePartnerContactList = (
  props: UsePartnerContactListProps
): UsePartnerContactListUtils => {
  const { listProps } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, contacts, listState } = useSelector((s: RootState) => s.partnerContactList)

  const [contactToDelete, setContanctToDelete] = useState<PopupState<PartnerContact>>()

  const handleGetList = useCallback(
    (params?: ListRequestParams) => {
      dispatch(partnerContactListActions.setListConstraints(listProps.listConstraint))
      dispatch(partnerContactListActions.getContacts(params))
    },
    [dispatch, listProps.listConstraint]
  )

  const tableUtils = useTableUtils<PartnerContact>({
    listParamsState: listParams,
    filterKeys: ['name', 'email', 'phone', 'role'],
    getDataAction: partnerContactListActions.getContacts
  })

  const crudOptions = useCallback(
    (record: PartnerContact): CrudButtonsProps => {
      const config: CrudButtonsProps = {}
      if (listProps.canEdit) {
        config.onDelete = (): void => {
          setContanctToDelete({
            data: record,
            popupVisible: true
          })
        }
        config.onEdit = () => record.id && listProps.handleEdit(record.id)
      } else {
        config.onView = () => record.id && listProps.handleEdit(record.id)
      }
      return config
    },
    [listProps]
  )

  const roleOptions = useRoleGenerator(listProps.userType)

  const columnsConfig: ColumnType<PartnerContact>[] = useMemo(
    () => [
      tableUtils.columnConfig({
        title: t('partner-contact.field.name'),
        key: 'name',
        width: '25%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        // TODO: Revisit this column after majorPartner and pca/pce roles are finalized.
        title:
          listProps.userType === UserType.NKM
            ? t('partner-contact.field.role')
            : t('partner-contact.field.type'),
        key: 'role',
        filterMode: FilterMode.FILTER,
        width: '12rem',
        filters: roleOptions,
        render: (value, record: PartnerContact) =>
          listProps.userType === UserType.NKM
            ? value?.length && t(`user.role.${value.toLowerCase?.()}`)
            : record.majorPartner
            ? t('partner-contact.field.partner-type.major')
            : t('partner-contact.field.partner-type.normal')
      }),
      tableUtils.columnConfig({
        title: t('partner-contact.field.active'),
        key: 'isActive',
        width: '6rem',
        render: value =>
          value
            ? t(`partner-contact.field.status-active`)
            : t(`partner-contact.field.status-inactive`)
      }),
      tableUtils.columnConfig({
        title: t('partner-contact.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.columnConfig({
        title: t('partner-contact.field.phone'),
        key: 'phone',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      tableUtils.actionColumnConfig({
        render(_: unknown, record: PartnerContact) {
          return <CrudButtons {...crudOptions(record)} />
        }
      })
    ],
    [tableUtils, crudOptions, t, roleOptions, listProps]
  )

  const tableProps: ResponsiveTableProps = {
    loading: listState === FeatureState.Loading,
    columns: columnsConfig,
    dataSource: tableUtils.addKeyProp(contacts),
    pagination: tableUtils.paginationConfig,
    onChange: tableUtils.handleTableChange
  }

  const deletePopupProps: GenericPopupProps = {
    type: 'delete',
    id: contactToDelete?.data?.id!,
    visible: !!contactToDelete?.popupVisible,
    onCancel: () => setContanctToDelete({ ...contactToDelete, popupVisible: false }),
    onOkAction: partnerContactListActions.deleteContact(
      contactToDelete?.data?.id!,
      contactToDelete?.data?.role!
    ),
    afterClose: () => setContanctToDelete(null)
  }

  return {
    deletePopupProps,
    tableProps,
    contactToDelete,
    handleGetList
  }
}
