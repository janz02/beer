import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../../hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { segmentationCategoryListActions } from './segmentationCategoryListSlice'
import { useTableUtils } from 'hooks/useTableUtils'
import { SegmentationCategory } from 'models/segmentationCategory'
import { ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'

interface UseSegmentationCategoryListProps {
  onOpenEditor: (id?: number) => void
}

export interface UseSegmentationCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useSegmentationCategoryList = (
  props: UseSegmentationCategoryListProps
): UseSegmentationCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getCategories, deleteCategory, resetCategoryFilters } = segmentationCategoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.segmentationCategoryList
  )

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<SegmentationCategory>>()

  const loading = listState === FeatureState.Loading

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<SegmentationCategory>({
    listParamsState: listParams,
    filterKeys: ['name'],
    sortWithoutDefaultOption: true,
    getDataAction: getCategories
  })

  const columnsConfig: ColumnType<SegmentationCategory>[] = useMemo(
    () => [
      columnConfig({
        title: t('segmentation-category.field.name'),
        key: 'name',
        sort: true
        // filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('segmentation-category.field.created-date'),
        key: 'createdDate',
        width: '13rem',
        renderMode: 'date time'
        // filterMode: FilterMode.DATEPICKER
      }),
      hasPermission([Roles.Administrator])
        ? actionColumnConfig({
            render(record: SegmentationCategory) {
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
    resetFilters: () => {
      dispatch(resetCategoryFilters())
    }
  }
}
