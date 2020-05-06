import React, { FC, useState, useMemo } from 'react'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTableUtils } from 'hooks/useTableUtils'
import { siteEditorActions } from '../siteEditor/siteEditorSlice'
import { Cashier } from 'models/cashier'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ColumnType } from 'antd/lib/table'
import { AddButton } from 'components/buttons/AddButton'
import { FeatureState } from 'models/featureState'

interface CashierListProps {
  onOpenEditor: (id?: number, createNew?: boolean) => void
}

export const CashierList: FC<CashierListProps> = props => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const { cashiersListParams, cashiers, site, cashierEditorState } = useSelector(
    (state: RootState) => state.siteEditor
  )
  const loadingCashierList = cashierEditorState === FeatureState.Loading

  const [cashierToDelete, setCashierToDelete] = useState<{
    cashier?: Cashier
    popupVisible?: boolean
  } | null>()

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

  const columnsConfig: ColumnType<Cashier>[] = useMemo(
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
              onEdit={() => onOpenEditor(record.id)}
              onDelete={() => {
                setCashierToDelete({
                  cashier: record,
                  popupVisible: true
                })
              }}
            />
          )
        }
      })
    ],
    [columnConfig, t, actionColumnConfig, onOpenEditor]
  )

  const headerOptions = (
    <AddButton disabled={!site?.id} size="middle" onClick={() => onOpenEditor(undefined, true)}>
      {t('cashier-list.add')}
    </AddButton>
  )

  return (
    <>
      <ResponsiveCard
        disableAutoScale
        forTable
        innerTitle={t('cashier-list.table-title')}
        innerOptions={headerOptions}
        paddedBottom
      >
        <ResponsiveTable
          hasHeaderOffset
          {...{
            loading: loadingCashierList,
            columns: columnsConfig,
            dataSource: addKeyProp(cashiers),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>

      <GenericPopup
        id={cashierToDelete?.cashier?.id}
        type="delete"
        visible={!!cashierToDelete?.popupVisible}
        onOkAction={siteEditorActions.deleteCashier(cashierToDelete?.cashier?.id!)}
        onCancel={() => setCashierToDelete({ ...cashierToDelete, popupVisible: false })}
        afterClose={() => setCashierToDelete(null)}
      />
    </>
  )
}
