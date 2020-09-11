import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector } from 'react-redux'
import { FeatureState } from 'models/featureState'
import { categoryListActions } from './categoryListSlice'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { Category } from 'models/category'
import { ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'

interface UseCategoryListProps {
  onOpenEditor: (id?: number) => void
}

interface UseCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
}

export const useCategoryList = (props: UseCategoryListProps): UseCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const { getCategories, deleteCategory } = categoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.categoryList
  )

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<Category>>()

  const loading = listState === FeatureState.Loading

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Category>({
    listParamsState: listParams,
    filterKeys: ['name'],
    sortWithoutDefaultOption: true,
    getDataAction: getCategories
  })

  const columnsConfig: ColumnType<Category>[] = useMemo(
    () => [
      columnConfig({
        title: t('campaign-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      hasPermission([Roles.Administrator])
        ? actionColumnConfig({
            render(record: Category) {
              return (
                <CrudButtons
                  onEdit={() => onOpenEditor(record.id)}
                  onDelete={() => {
                    setCategoryToDelete({
                      data: record,
                      popupVisible: true
                    })
                  }}
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
    dataSource: addKeyProp(categories),
    pagination: paginationConfig,
    onChange: handleTableChange
  }

  const popupProps: GenericPopupProps = {
    id: categoryToDelete?.data?.id,
    type: 'delete',
    visible: !!categoryToDelete?.popupVisible,
    onOkAction: deleteCategory(categoryToDelete?.data?.id!),
    onCancel: () => setCategoryToDelete({ ...categoryToDelete, popupVisible: false }),
    afterClose: () => setCategoryToDelete(null)
  }

  return {
    tableProps,
    popupProps
  }
}
