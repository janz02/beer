import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { FeatureState } from 'models/featureState'
import { couponCampaignCategoryListActions } from './couponCampaignCategoryListSlice'
import { useTableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { CouponCampaignCategory } from 'models/couponCampaignCategory'
import { hasPermission } from 'services/jwt-reader'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { pageViewRoles } from 'services/roleHelpers'

interface CouponCampaignCategoryListUtilsProps {
  onOpenEditor: (id?: number) => void
}

export interface CouponCampaignCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useCouponCampaignCategoryListUtils = (
  props: CouponCampaignCategoryListUtilsProps
): CouponCampaignCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getCategories, deleteCategory, resetCategoryFilters } = couponCampaignCategoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.couponCampaignCategoryList
  )

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<CouponCampaignCategory>>()

  const loading = useMemo(() => listState === FeatureState.Loading, [listState])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('coupon-campaign-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams> | undefined>(
    () =>
      isEditorUser
        ? {
            render(record: CouponCampaignCategory) {
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
    CouponCampaignCategory
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
    resetFilters: () => dispatch(resetCategoryFilters())
  }
}
