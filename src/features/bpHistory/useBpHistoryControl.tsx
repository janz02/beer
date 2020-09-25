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
import {
  clearTemplate,
  getBpHistory,
  getBpHistoryTemplateById,
  resetBpHistoryFilters
} from './bpHistorySlice'
import { Channels } from 'models/channels'
import { notification } from 'antd'
import { MomentDisplay } from 'components/MomentDisplay'

interface BpHistoryControl<T> {
  loading: boolean
  source: Array<T>
  paginationConfig: false | TablePaginationConfig
  columnOrder: UseColumnOrderFeatures<T>
  templateModal: {
    title: string | null
    content: string | null
  }
  handleResetFilters: () => void
  handleTemplateCloseClick: () => void
  handleTableChange: () => void
}

export const useBpHistoryControl = (): BpHistoryControl<BpHistoryItem> => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { bpHistoryItems, loading, listParams, template } = useSelector(
    (state: RootState) => state.bpHistory
  )

  useEffect(() => {
    dispatch(getBpHistory())
  }, [dispatch])

  const {
    paginationConfig,
    columnConfig,
    actionColumnConfig,
    addKeyProp,
    handleTableChange
  } = useTableUtils<BpHistoryItem>({
    listParamsState: listParams,
    filterKeys: ['bpId'],
    getDataAction: getBpHistory
  })

  const handleResetFilters = useCallback(() => {
    dispatch(resetBpHistoryFilters())
  }, [dispatch])

  const handleTemplateViewClick = useCallback(
    templateId => {
      if (!templateId) {
        notification.error({ message: t('error.common.no-template') })
        return
      }

      dispatch(getBpHistoryTemplateById(templateId))
    },
    [dispatch, t]
  )

  const handleTemplateCloseClick = useCallback(() => {
    dispatch(clearTemplate())
  }, [dispatch])

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
        sort: true,
        render(value) {
          return <MomentDisplay date={value} />
        }
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
        fixed: 'right',
        width: '50px',
        render(record: BpHistoryItem) {
          return <CrudButtons onView={() => handleTemplateViewClick(record.templateId)} />
        }
      })
    ],
    [actionColumnConfig, columnConfig, t, handleTemplateViewClick]
  )

  const columnOrder = useColumnOrder(columnsConfig, ColumnStorageName.BP_HISTORY)

  const source = useMemo(() => addKeyProp(bpHistoryItems), [addKeyProp, bpHistoryItems])

  const templateModal = useMemo(
    () => ({
      content: template?.body || null,
      title: template?.subject || null
    }),
    [template]
  )

  return {
    loading,
    columnOrder,
    paginationConfig,
    templateModal,
    source,
    handleResetFilters,
    handleTemplateCloseClick,
    handleTableChange
  }
}
