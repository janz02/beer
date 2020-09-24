import { RootState } from 'app/rootReducer'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrder, UseColumnOrderFeatures } from 'components/table-columns/useColumnOrder'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import React, { useCallback, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BpHistoryItem } from 'models/bpHistoryItem'
import { ColumnType, TablePaginationConfig } from 'antd/lib/table'
import { getBpHistory, resetBpHistoryFilters } from './bpHistoryListSlice'
import { Channels } from 'models/channels'

interface BpHistoryControl<T> {
  loading: boolean
  source: Array<T>
  paginationConfig: false | TablePaginationConfig
  columnOrder: UseColumnOrderFeatures<T>
  handleResetFilters: () => void
}

export const useBpHistoryControl = (): BpHistoryControl<BpHistoryItem> => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { bpHistoryItems, loading, listParams } = useSelector(
    (state: RootState) => state.bpHistoryList
  )

  useEffect(() => {
    dispatch(getBpHistory())
  }, [dispatch])

  const { paginationConfig, columnConfig, actionColumnConfig, addKeyProp } = useTableUtils<
    BpHistoryItem
  >({
    listParamsState: listParams,
    filterKeys: ['bpId'],
    getDataAction: getBpHistory
  })

  const handleResetFilters = useCallback(() => {
    dispatch(resetBpHistoryFilters())
  }, [dispatch])

  const handleTemplateClick = useCallback(templateId => {
    return <>{`template Id: ${templateId}`}</>
  }, [])

  const columnsConfig: ColumnType<BpHistoryItem>[] = useMemo(
    () => [
      columnConfig({
        title: t('bp-history.field.campaignName'),
        key: 'campaignName',
        sort: true
      }),
      columnConfig({
        title: t('bp-history.field.campaignTechnicalName'),
        key: 'campaignTechnicalName',
        sort: true
      }),
      columnConfig({
        title: t('bp-history.field.createdDate'),
        key: 'createdDate',
        sort: true
      }),
      columnConfig({
        title: t('bp-history.field.bpCode'),
        key: 'bpId',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('bp-history.field.contact'),
        key: 'contact',
        sort: true
      }),
      columnConfig({
        title: t('bp-history.field.channelName'),
        key: 'channelId',
        sort: true,
        render(value) {
          return <>{t(`enum.channel-type.${Channels[value]}`)}</>
        }
      }),
      columnConfig({
        title: t('bp-history.field.event'),
        key: 'event',
        sort: true
      }),
      columnConfig({
        title: t('bp-history.field.eventResult'),
        key: 'eventResult',
        sort: true
      }),
      columnConfig({
        title: t('bp-history.field.campaignResult'),
        key: 'campaignResult',
        sort: true
      }),
      actionColumnConfig({
        width: '50px',
        render(record: BpHistoryItem) {
          return <CrudButtons onView={() => handleTemplateClick(record.templateId)} />
        }
      })
    ],
    [actionColumnConfig, columnConfig, t, handleTemplateClick]
  )

  const columnOrder = useColumnOrder(columnsConfig, ColumnStorageName.BP_HISTORY)

  return {
    loading,
    columnOrder,
    paginationConfig,
    source: addKeyProp(bpHistoryItems),
    handleResetFilters
  }
}
