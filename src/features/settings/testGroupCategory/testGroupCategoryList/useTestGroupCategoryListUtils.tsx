import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { useTableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { hasPermission } from 'services/jwt-reader'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { TestGroupCategory } from 'models/campaign/testGroupCategory'
import { testGroupCategoryListActions } from './testGroupCategoryListSlice'
import { pageViewRoles } from 'services/roleHelpers'

interface TestGroupCategoryListUtilsProps {
  onOpenEditor: (id?: number) => void
}

export interface TestGroupCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useTestGroupCategoryListUtils = (
  props: TestGroupCategoryListUtilsProps
): TestGroupCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getCategories, deleteCategory, resetCategoryFilters } = testGroupCategoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.testGroupCategoryList
  )

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<TestGroupCategory>>()

  const loading = useMemo(() => listState === FeatureState.Loading, [listState])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('test-group-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('test-group-category.field.created-date'),
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
          }
        : undefined,
    [onOpenEditor, isEditorUser]
  )

  const { paginationConfig, handleTableChange, columnsConfig, addKeyProp } = useTableUtils<
    TestGroupCategory
  >({
    listParamsState: listParams,
    filterKeys: ['name'],
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
    [paginationConfig, handleTableChange, addKeyProp, categories, columnsConfig, loading]
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
    resetFilters: () => dispatch(resetCategoryFilters())
  }
}
