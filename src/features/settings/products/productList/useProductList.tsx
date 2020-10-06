import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from '../../../../hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { productListActions } from './productListSlice'
import { FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { Product } from 'models/product'
import { ColumnType } from 'antd/lib/table'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { Roles } from 'api/swagger/coupon'
import { hasPermission } from 'services/jwt-reader'

interface UseProductListProps {
  onOpenEditor: (id?: number) => void
}

export interface UseProductListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useProductList = (props: UseProductListProps): UseProductListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getProducts, deleteProduct, resetProductFilters } = productListActions
  const { listParams, products, listState } = useSelector((state: RootState) => state.productList)

  const [productToDelete, setProductToDelete] = useState<PopupState<Product>>()

  const loading = listState === FeatureState.Loading

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Product>({
    listParamsState: listParams,
    filterKeys: ['name'],
    sortWithoutDefaultOption: true,
    getDataAction: getProducts
  })

  const columnsConfig: ColumnType<Product>[] = useMemo(
    () => [
      columnConfig({
        title: t('campaign-product.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('campaign-product.field.createdDate'),
        key: 'createdDate',
        width: '13rem',
        renderMode: 'date time'
      }),
      hasPermission([Roles.Administrator])
        ? actionColumnConfig({
            render(record: Product) {
              return (
                <CrudButtons
                  onEdit={() => onOpenEditor(record.id)}
                  // Deletion is disabled until the RTD BE fixes the 403 error
                  /* onDelete={() => {
                    setProductToDelete({
                      data: record,
                      popupVisible: true
                    })
                  }} */
                />
              )
            }
          })
        : {}
    ],
    [columnConfig, t, actionColumnConfig, onOpenEditor]
  )

  const tableProps: ResponsiveTableProps = {
    loading,
    columns: columnsConfig,
    dataSource: addKeyProp(products),
    pagination: paginationConfig,
    onChange: handleTableChange
  }

  const popupProps: GenericPopupProps = {
    id: productToDelete?.data?.id,
    type: 'delete',
    visible: !!productToDelete?.popupVisible,
    onOkAction: deleteProduct(productToDelete?.data?.id!),
    onCancel: () => setProductToDelete({ ...productToDelete, popupVisible: false }),
    afterClose: () => setProductToDelete(null)
  }

  return {
    tableProps,
    popupProps,
    resetFilters: () => dispatch(resetProductFilters())
  }
}
