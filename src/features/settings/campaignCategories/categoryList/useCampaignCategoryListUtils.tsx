import React, { useState, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { FeatureState } from 'models/featureState'
import { campaignCategoryListActions } from './campaignCategoryListSlice'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { CampaignCategory } from 'models/campaign/campaignCategory'
import { ColumnType } from 'antd/lib/table'
import { hasPermission } from 'services/jwt-reader'
import { Roles } from 'api/swagger/coupon'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'

interface CampaignCategoryListUtilsProps {
  onOpenEditor: (id?: number) => void
}

export interface CampaignCategoryListUtils {
  tableProps: ResponsiveTableProps
  popupProps: GenericPopupProps
  resetFilters: () => void
}

export const useCampaignCategoryListUtils = (
  props: CampaignCategoryListUtilsProps
): CampaignCategoryListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getCategories, deleteCategory, resetCategoryFilters } = campaignCategoryListActions
  const { listParams, categories, listState } = useSelector(
    (state: RootState) => state.campaignCategoryList
  )

  const [categoryToDelete, setCategoryToDelete] = useState<PopupState<CampaignCategory>>()

  const loading = listState === FeatureState.Loading

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<CampaignCategory>({
    listParamsState: listParams,
    filterKeys: ['name'],
    sortWithoutDefaultOption: true,
    getDataAction: getCategories
  })

  const columnsConfig: ColumnType<CampaignCategory>[] = useMemo(
    () => [
      columnConfig({
        title: t('campaign-category.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      hasPermission([Roles.Administrator])
        ? actionColumnConfig({
            render(record: CampaignCategory) {
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
