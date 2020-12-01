import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useParams } from 'react-router-dom'
import { Cashier } from 'models/cashier'
import { ColumnConfigParams, useTableUtils } from 'hooks/useTableUtils'
import { siteEditorActions } from '../siteEditorSlice'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { FeatureState } from 'models/featureState'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'
import { SiteFeatureConfig } from 'features/sites/siteList/useSiteListUtils'
import { getSiteListRootPath } from '../site/useSiteEditorFormUtils'

interface CashierManagerUtils {
  cashierManagerVisible: boolean
  handleCreateCashier: () => void
  cashierTableProps: ResponsiveTableProps
  cashierDeletePopupProps: GenericPopupProps
  cashierEditorFormModalProps: GenericModalFormProps
}
export const useCashierManagerUtils = (config: SiteFeatureConfig): CashierManagerUtils => {
  const { siteId, cashierId, partnerId } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const {
    cashiersListParams,
    cashiers,
    cashierListState,
    cashier,
    cashierEditorState
  } = useSelector((s: RootState) => s.siteEditor)

  const cashierEditorModalUtils = useGenericModalFormEditorUtils({
    dataId: cashierId,
    rootRoute: `${getSiteListRootPath(partnerId)}/${siteId}`
  })

  const cashierManagerVisible = !!siteId && !isNaN(+siteId)

  const [cashierToDelete, setCashierToDelete] = useState<PopupState<Cashier>>()
  const loadingCashierEditor = cashierEditorState === FeatureState.Loading

  const handleSaveCashier = async (cashier: Cashier): Promise<void> => {
    const saved: any = await dispatch(
      siteEditorActions.saveCashier({ ...cashier, id: cashierId ? +cashierId : undefined })
    )
    saved && cashierEditorModalUtils.handleExit()
  }

  const handleCreateCashier = (): void => {
    cashierEditorModalUtils.routeToEditor()
  }

  const cashierTableColumnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('cashier-list.table.cashier-id'),
        key: 'cashierId',
        sort: true
      },
      {
        title: t('cashier-list.table.digital-stamp-id'),
        key: 'digitalStampId',
        sort: true
      }
    ],
    [t]
  )

  const cashierTableActionColumnParams = useMemo<Partial<ColumnConfigParams>>(
    () => ({
      render(record: Cashier) {
        let onEdit, onDelete

        if (config.canEdit) {
          onEdit = () => {
            record.id && dispatch(siteEditorActions.getCashier(record.id))
            cashierEditorModalUtils.routeToEditor(record.id)
          }
          onDelete = () => {
            setCashierToDelete({
              data: record,
              popupVisible: true
            })
          }
        }

        return <CrudButtons onEdit={onEdit} onDelete={onDelete} />
      }
    }),
    [cashierEditorModalUtils, config, dispatch]
  )

  const {
    paginationConfig,
    handleTableChange,
    columnsConfig: cashierTableColumnsConfig,
    addKeyProp
  } = useTableUtils<Cashier>({
    listParamsState: cashiersListParams,
    getDataAction: siteEditorActions.getCashiers,
    columnParams: cashierTableColumnParams,
    actionColumnParams: cashierTableActionColumnParams
  })

  const cashierTableProps: ResponsiveTableProps = {
    loading: cashierListState === FeatureState.Loading,
    columns: cashierTableColumnsConfig,
    dataSource: addKeyProp(cashiers),
    pagination: paginationConfig,
    onChange: handleTableChange
  }

  const cashierDeletePopupProps: GenericPopupProps = {
    id: cashierToDelete?.data?.id,
    type: 'delete',
    visible: !!cashierToDelete?.popupVisible,
    onOkAction: siteEditorActions.deleteCashier(cashierToDelete?.data?.id!),
    onCancel: () => setCashierToDelete({ ...cashierToDelete, popupVisible: false }),
    afterClose: () => setCashierToDelete(null)
  }

  const cashierEditorFormModalProps: GenericModalFormProps = {
    loadingContent: loadingCashierEditor,
    modalProps: {
      visible: cashierEditorModalUtils.editorParams.visible,
      title: cashierEditorModalUtils.editorParams.isNew
        ? t('cashier-editor.editor-create')
        : t('cashier-editor.editor-edit'),
      okText: t('common.save'),
      afterClose: (): void => {
        cashierEditorModalUtils.handleAfterClose()
        dispatch(siteEditorActions.clearCashierEditor())
      },
      onCancel: cashierEditorModalUtils.handleExit
    },
    formProps: {
      name: 'cashier-editor',
      onFinish: handleSaveCashier
    },
    initialValues: cashier
  }

  return {
    cashierManagerVisible,
    handleCreateCashier,
    cashierTableProps,
    cashierDeletePopupProps,
    cashierEditorFormModalProps
  }
}
