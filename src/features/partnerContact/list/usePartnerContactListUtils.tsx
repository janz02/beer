import React, { useState, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { partnerContactListActions } from './partnerContactListSlice'
import {
  ListRequestParams,
  useTableUtils,
  FilterMode,
  ColumnConfigParams
} from 'hooks/useTableUtils'
import { PartnerContact } from 'models/partnerContact'
import { RootState } from 'app/rootReducer'
import { UserType } from 'models/user'
import { CrudButtons, CrudButtonsProps } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { FeatureState } from 'models/featureState'
import { useRoleGenerator } from 'hooks/useRoleGenerator'
import { partnerContactModalActions } from '../modal/partnerContactModalSlice'
import { PartnerContactConfig } from '../PartnerContactTile'

interface PartnerContactListUtilsProps {
  config: PartnerContactConfig
}
interface PartnerContactListUtils {
  tableProps: ResponsiveTableProps
  contactToDelete: PopupState<PartnerContact> | undefined | null
  deletePopupProps: GenericPopupProps
  handleGetList: (params?: ListRequestParams) => void
  handleOpenInviter: () => void
  resetFilters: () => void
  handleExport: () => void
}
export const usePartnerContactListUtils = (
  props: PartnerContactListUtilsProps
): PartnerContactListUtils => {
  const { canEdit, listConstraint, userType } = props.config
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { listParams, contacts, listState } = useSelector((s: RootState) => s.partnerContactList)

  const [contactToDelete, setContactToDelete] = useState<PopupState<PartnerContact>>()

  const handleGetList = useCallback(
    (params?: ListRequestParams) => {
      dispatch(partnerContactListActions.setListConstraints(listConstraint))
      dispatch(partnerContactListActions.getContacts(params))
    },
    [dispatch, listConstraint]
  )

  const resetFilters = (): void => {
    dispatch(partnerContactListActions.resetContactFilters)
  }

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
          setContactToDelete({
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

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('partner-contact.field.name'),
        key: 'name',
        width: '25%',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
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
      },
      {
        title: t('partner-contact.field.active'),
        key: 'isActive',
        width: '6rem',
        filterMode: FilterMode.ACTIVE_INACTIVE
      },
      {
        title: t('partner-contact.field.email'),
        key: 'email',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('partner-contact.field.phone'),
        key: 'phone',
        sort: true,
        filterMode: FilterMode.SEARCH
      }
    ],
    [t, roleOptions, userType]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams>>(
    () => ({
      render(_: unknown, record: PartnerContact) {
        return <CrudButtons {...crudOptions(record)} />
      }
    }),
    [crudOptions]
  )

  const tableUtils = useTableUtils<PartnerContact>({
    listParamsState: listParams,
    filterKeys: ['name', 'email', 'phone', 'role'],
    getDataAction: partnerContactListActions.getContacts,
    columnParams,
    actionColumnParams
  })

  const tableProps: ResponsiveTableProps = {
    loading: listState === FeatureState.Loading,
    columns: tableUtils.columnsConfig,
    dataSource: tableUtils.addKeyProp(contacts),
    pagination: tableUtils.paginationConfig,
    onChange: tableUtils.handleTableChange
  }

  const deletePopupProps: GenericPopupProps = {
    type: 'delete',
    id: contactToDelete?.data?.id!,
    visible: !!contactToDelete?.popupVisible,
    onCancel: () => setContactToDelete({ ...contactToDelete, popupVisible: false }),
    onOkAction: partnerContactListActions.deleteContact(
      contactToDelete?.data?.id!,
      contactToDelete?.data?.role!
    ),
    afterClose: () => setContactToDelete(null)
  }

  const handleExport = useCallback((): void => {
    dispatch(partnerContactListActions.exportPartnerContacts())
  }, [dispatch])

  return {
    deletePopupProps,
    tableProps,
    contactToDelete,
    handleOpenInviter,
    handleGetList,
    resetFilters,
    handleExport
  }
}
