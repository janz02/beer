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
import { useRoleGenerator } from 'hooks/useRoleGenerator'
import { partnerContactModalActions } from '../modal/partnerContactModalSlice'
import { PartnerContactConfig } from '../PartnerContactTile'

interface UsePartnerContactListProps {
  config: PartnerContactConfig
}
interface UsePartnerContactListUtils {
  tableProps: ResponsiveTableProps
  contactToDelete: PopupState<PartnerContact> | undefined | null
  deletePopupProps: GenericPopupProps
  handleGetList: (params?: ListRequestParams) => void
  handleOpenInviter: () => void
}
export const usePartnerContactList = (
  props: UsePartnerContactListProps
): UsePartnerContactListUtils => {
  const { canEdit, listConstraint, userType } = props.config
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, contacts, listState } = useSelector((s: RootState) => s.partnerContactList)

  const [contactToDelete, setContanctToDelete] = useState<PopupState<PartnerContact>>()

  const handleGetList = useCallback(
    (params?: ListRequestParams) => {
      dispatch(partnerContactListActions.setListConstraints(listConstraint))
      dispatch(partnerContactListActions.getContacts(params))
    },
    [dispatch, listConstraint]
  )

  const tableUtils = useTableUtils<PartnerContact>({
    listParamsState: listParams,
    filterKeys: ['name', 'email', 'phone', 'role'],
    getDataAction: partnerContactListActions.getContacts
  })

  const handleInspectContact = useCallback(
    (id: number | undefined) => {
      id && dispatch(partnerContactModalActions.inspectContact(id))
    },
    [dispatch]
  )

  const handleOpenInviter = (): void => {
    dispatch(partnerContactModalActions.openInviter({ partnerId: listConstraint.partnerId }))
  }

  const crudOptions = useCallback(
    (record: PartnerContact): CrudButtonsProps => {
      const config: CrudButtonsProps = {}
      if (canEdit) {
        config.onDelete = (): void => {
          setContanctToDelete({
            data: record,
            popupVisible: true
          })
        }
        config.onEdit = () => handleInspectContact(record.id)
      } else {
        config.onView = () => handleInspectContact(record.id)
      }
      return config
    },
    [handleInspectContact, canEdit]
  )

  const roleOptions = useRoleGenerator(userType)

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
          userType === UserType.NKM
            ? t('partner-contact.field.role')
            : t('partner-contact.field.type'),
        key: 'role',
        filterMode: FilterMode.FILTER,
        width: '12rem',
        filters: roleOptions,
        render: role => (role ? t(`user.role-short.${role?.toLowerCase()}`) : '')
      }),
      tableUtils.columnConfig({
        title: t('partner-contact.field.active'),
        key: 'isActive',
        width: '6rem',
        filterMode: FilterMode.ACTIVE_INACTIVE,
        activenessOptions: {
          active: t(`partner-contact.field.status-active`),
          inactive: t(`partner-contact.field.status-inactive`)
        }
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
    [tableUtils, crudOptions, t, roleOptions, userType]
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
    handleOpenInviter,
    handleGetList
  }
}
