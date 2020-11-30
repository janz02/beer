import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from '../../../../hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { productListActions } from './productListSlice'
import { ColumnConfigParams, FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { Product } from 'models/campaign/product'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'

interface ProductListUtilsProps {
  onOpenEditor: (id?: number) => void
}

export interface ProductListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useProductListUtils = (props: ProductListUtilsProps): ProductListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getProducts, deleteProduct, resetProductFilters } = productListActions
  const { listParams, products, listState } = useSelector((state: RootState) => state.productList)

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const [productToDelete, setProductToDelete] = useState<PopupState<Product>>()

  const loading = useMemo(() => listState === FeatureState.Loading, [listState])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('campaign-product.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('campaign-product.field.createdDate'),
        key: 'createdDate',
        width: '13rem',
        renderMode: 'date time'
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () =>
      isEditorUser
        ? {
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
          }
        : undefined,
    [onOpenEditor, isEditorUser]
  )

  const { paginationConfig, handleTableChange, columnsConfig, addKeyProp } = useTableUtils<Product>(
    {
      listParamsState: listParams,
      sortWithoutDefaultOption: true,
      getDataAction: getProducts,
      columnParams,
      actionColumnParams
    }
  )

  const tableProps: ResponsiveTableProps = useMemo(
    () => ({
      loading,
      columns: columnsConfig,
      dataSource: addKeyProp(products),
      pagination: paginationConfig,
      onChange: handleTableChange
    }),
    [loading, columnsConfig, addKeyProp, products, paginationConfig, handleTableChange]
  )

  const popupProps: GenericPopupProps = useMemo(
    () => ({
      id: productToDelete?.data?.id,
      type: 'delete',
      visible: !!productToDelete?.popupVisible,
      onOkAction: deleteProduct(productToDelete?.data?.id!),
      onCancel: () => setProductToDelete({ ...productToDelete, popupVisible: false }),
      afterClose: () => setProductToDelete(null)
    }),
    [productToDelete, deleteProduct]
  )

  return {
    tableProps,
    popupProps,
    resetFilters: () => dispatch(resetProductFilters())
  }
}
