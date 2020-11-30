import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from '../../../../hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { segmentationCategoryListActions } from './segmentationCategoryListSlice'
import { ColumnConfigParams, FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { SegmentationCategory } from 'models/campaign/segmentationCategory'
import { hasPermission } from 'services/jwt-reader'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { pageViewRoles } from 'services/roleHelpers'

interface SegmentationCategoryListUtilsProps {
  onOpenEditor: (id?: number) => void
}

export interface SegmentationCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useSegmentationCategoryListUtils = (
  props: SegmentationCategoryListUtilsProps
): SegmentationCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getCategories, deleteCategory, resetCategoryFilters } = segmentationCategoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.segmentationCategoryList
  )

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<SegmentationCategory>>()

  const loading = useMemo(() => listState === FeatureState.Loading, [listState])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('segmentation-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('segmentation-category.field.created-date'),
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
          }
        : undefined,
    [onOpenEditor, isEditorUser]
  )

  const { paginationConfig, handleTableChange, columnsConfig, addKeyProp } = useTableUtils<
    SegmentationCategory
  >({
    listParamsState: listParams,
    sortWithoutDefaultOption: true,
    getDataAction: getCategories,
    columnParams,
    actionColumnParams
  })

  const tableProps: ResponsiveTableProps = useMemo(
    () => ({
      loading,
      columns: columnsConfig,
      dataSource: addKeyProp(categories),
      pagination: paginationConfig,
      onChange: handleTableChange
    }),
    [loading, columnsConfig, addKeyProp, categories, paginationConfig, handleTableChange]
  )

  const popupProps: GenericPopupProps = useMemo(
    () => ({
      id: categoryToDelete?.data?.id,
      type: 'delete',
      visible: !!categoryToDelete?.popupVisible,
      onOkAction: deleteCategory(categoryToDelete?.data?.id!),
      onCancel: () => setCategoryToDelete({ ...categoryToDelete, popupVisible: false }),
      afterClose: () => setCategoryToDelete(null)
    }),
    [categoryToDelete, deleteCategory]
  )

  return {
    tableProps,
    popupProps,
    resetFilters: () => {
      dispatch(resetCategoryFilters())
    }
  }
}
