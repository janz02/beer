import React, { FC, useState, useMemo } from 'react'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { GenericPopup } from 'components/popups/GenericPopup'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTableUtils } from 'hooks/useTableUtils'
import { updateCashiers, deleteCashier } from '../siteEditor/siteEditorSlice'
import { Cashier } from 'models/cashier'

interface CashierListProps {
  onOpenEditor: (id?: number, createNew?: boolean) => void
}

export const CashierList: FC<CashierListProps> = props => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const { error, pagination, cashiers, site } = useSelector((state: RootState) => state.siteEditor)

  const [cashierToDelete, setCashierToDelete] = useState<{
    cashier?: Cashier
    popupVisible?: boolean
  } | null>()

  const { paginationConfig, handleTableChange, sorterConfig } = useTableUtils({
    error,
    paginationState: pagination,
    getDataAction: updateCashiers
  })

  const columnsConfig = useMemo(
    () => [
      {
        title: t('cashier-list.table.cashier-id'),
        key: 'cashierId',
        dataIndex: 'cashierId',
        ...sorterConfig
      },
      {
        title: t('cashier-list.table.digital-stamp-id'),
        key: 'digitalStampId',
        dataIndex: 'digitalStampId',
        ...sorterConfig
      },
      {
        title: t('common.actions'),
        key: 'actions',
        colSpan: 1,
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
      }
    ],
    [t, sorterConfig, onOpenEditor]
  )

  const headerOptions = (): JSX.Element => (
    <>
      {site?.id && (
        <Button type="primary" onClick={() => onOpenEditor(undefined, true)}>
          {t('common.create')}
        </Button>
      )}
    </>
  )

  return (
    <>
      <ResponsiveTable
        headerTitle={t('cashier-list.table-title')}
        headerOptions={headerOptions}
        tableProps={{
          columns: columnsConfig,
          dataSource: cashiers?.map((c, i) => ({ ...c, key: '' + i + c.id })),
          pagination: paginationConfig,
          onChange: handleTableChange
        }}
        error={error}
      />

      <GenericPopup
        id={cashierToDelete?.cashier?.id}
        type="delete"
        visible={!!cashierToDelete?.popupVisible}
        onOkAction={deleteCashier(cashierToDelete?.cashier?.id!)}
        onCancel={() => setCashierToDelete({ ...cashierToDelete, popupVisible: false })}
        afterClose={() => setCashierToDelete(null)}
      />
    </>
  )
}
