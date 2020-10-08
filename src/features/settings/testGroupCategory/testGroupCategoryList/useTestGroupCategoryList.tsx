import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { TestGroupCategory } from 'models/campaign/testGroupCategory'
import { testGroupCategoryListActions } from './testGroupCategoryListSlice'

interface UseCategoryListProps {
  onOpenEditor: (id?: number) => void
}

export interface UseTestGroupCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useTestGroupCategoryList = (
  props: UseCategoryListProps
): UseTestGroupCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getCategories, deleteCategory, resetCategoryFilters } = testGroupCategoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.testGroupCategoryList
  )

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<TestGroupCategory>>()

  const loading = listState === FeatureState.Loading

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<TestGroupCategory>({
    listParamsState: listParams,
    filterKeys: ['name'],
    sortWithoutDefaultOption: true,
    getDataAction: getCategories
  })

  const columnsConfig: ColumnType<TestGroupCategory>[] = useMemo(
    () => [
      columnConfig({
        title: t('test-group-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('test-group-category.field.created-date'),
        key: 'createdDate',
        width: '13rem',
        renderMode: 'date time'
      }),
      hasPermission([Roles.Administrator])
        ? actionColumnConfig({
            render(record: TestGroupCategory) {
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
    popupProps,
    resetFilters: () => dispatch(resetCategoryFilters())
  }
}
