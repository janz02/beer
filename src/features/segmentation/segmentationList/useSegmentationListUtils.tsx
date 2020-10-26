import { ColumnType } from 'antd/lib/table'
import { RootState } from 'app/rootReducer'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { FilterMode, useTableUtils } from 'hooks/useTableUtils'
import { CampaignSegmentation } from 'models/campaign/campaignSegmentation'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { getSegmentations, resetSegmentationFilters } from './segmentationListSlice'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { hasPermission } from 'services/jwt-reader'
import { pageViewRoles } from 'services/roleHelpers'
import { history } from 'router/router'
import { AddButton } from 'components/buttons/AddButton'

export interface SegmentationListUtils {
  tableProps: ResponsiveTableProps
  headerOptions: JSX.Element
}

export const useSegmentationListUtils = (): SegmentationListUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const resetFilters = useCallback(() => {
    dispatch(resetSegmentationFilters())
  }, [dispatch])

  const { segmentations, loading, listParams } = useSelector(
    (state: RootState) => state.segmentationList
  )

  const isEditor = hasPermission(pageViewRoles.segmentationEditor)

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<CampaignSegmentation>({
    listParamsState: listParams,
    filterKeys: ['name', 'categoryName', 'createdDate'],
    getDataAction: getSegmentations
  })

  const columnsConfig = useMemo(
    (): ColumnType<CampaignSegmentation>[] => [
      columnConfig({
        title: t('segmentation.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('segmentation.field.category'),
        key: 'categoryName',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('segmentation.field.cumulativeIntersection'),
        key: 'cumulativeIntersection'
      }),
      columnConfig({
        title: t('segmentation.field.segmentSize'),
        key: 'segmentSize'
      }),
      columnConfig({
        title: t('segmentation.field.createdDate'),
        key: 'createdDate',
        sort: true,
        renderMode: 'date time',
        filterMode: FilterMode.DATERANGEPICKER
      }),
      actionColumnConfig({
        fixed: 'right',
        render(record: CampaignSegmentation) {
          return (
            <CrudButtons
              onEdit={isEditor ? () => history.push(`/segmentations/${record.id}`) : undefined}
            />
          )
        }
      })
    ],
    [columnConfig, t, isEditor, actionColumnConfig]
  )

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.SEGMENTATION)

  const tableProps = useMemo(
    () => ({
      loading,
      columns: columnOrderUtils.currentColumns,
      dataSource: addKeyProp(segmentations),
      pagination: paginationConfig,
      onChange: handleTableChange
    }),
    [
      addKeyProp,
      columnOrderUtils.currentColumns,
      paginationConfig,
      handleTableChange,
      loading,
      segmentations
    ]
  )

  const headerOptions = useMemo(
    () => (
      <>
        <ResetFiltersButton onClick={resetFilters} />
        <ColumnOrderDropdown {...columnOrderUtils} />
        {isEditor ? (
          <AddButton onClick={() => history.push(`/segmentations/new`)}>
            {t('segmentation.list.add')}
          </AddButton>
        ) : (
          undefined
        )}
      </>
    ),
    [columnOrderUtils, resetFilters, isEditor, t]
  )

  return {
    tableProps,
    headerOptions
  }
}
