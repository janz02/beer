import React, { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { useGenericModalFormEditorUtils } from 'hooks/useGenericModalEditorUtils'
import { useParams } from 'react-router-dom'
import { Cashier } from 'models/cashier'
import { useTableUtils } from 'hooks/useTableUtils'
import { siteEditorActions } from '../siteEditorSlice'
import { ColumnType } from 'antd/lib/table'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { FeatureState } from 'models/featureState'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { GenericModalFormProps } from 'components/popups/GenericModalForm'

interface UseCashierManagerUtils {
  cashierManagerVisible: boolean
  handleCreateCashier: () => void
  cashierTableProps: ResponsiveTableProps
  cashierDeletePopupProps: GenericPopupProps
  cashierEditorFormModalProps: GenericModalFormProps
}
export const useCashierManager = (): UseCashierManagerUtils => {
  const { siteId, cashierId } = useParams()
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { config } = useSelector((s: RootState) => s.siteList)
  const {
    cashiersListParams,
    cashiers,
    cashierListState,
    cashier,
    cashierEditorState
  } = useSelector((s: RootState) => s.siteEditor)

  const cashierEditorModalUtils = useGenericModalFormEditorUtils({
    dataId: cashierId,
    rootRoute: `${config.routeRoot}/${siteId}`
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

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Cashier>({
    listParamsState: cashiersListParams,
    filterKeys: ['cashierId', 'digitalStampId'],
    getDataAction: siteEditorActions.getCashiers
  })

  const cashierTableColumnsConfig: ColumnType<Cashier>[] = useMemo(
    () => [
      columnConfig({
        title: t('cashier-list.table.cashier-id'),
        key: 'cashierId',
        sort: true
      }),
      columnConfig({
        title: t('cashier-list.table.digital-stamp-id'),
        key: 'digitalStampId',
        sort: true
      }),
      actionColumnConfig({
        render(record: Cashier) {
          return (
            <CrudButtons
              onEdit={() => {
                record.id && dispatch(siteEditorActions.getCashier(record.id))
                cashierEditorModalUtils.routeToEditor(record.id)
              }}
              onDelete={() => {
                setCashierToDelete({
                  data: record,
                  popupVisible: true
                })
              }}
            />
          )
        }
      })
    ],
    [columnConfig, t, actionColumnConfig, cashierEditorModalUtils, dispatch]
  )

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
