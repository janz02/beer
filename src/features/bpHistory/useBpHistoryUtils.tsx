import { RootState } from 'app/rootReducer'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { useColumnOrderUtils, ColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useTableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { BpHistoryItem } from 'models/campaign/bpHistoryItem'
import { TablePaginationConfig } from 'antd/lib/table'
import {
  clearTemplate,
  getBpHistory,
  getBpHistoryTemplateById,
  resetBpHistoryFilters
} from './bpHistorySlice'
import { Channels } from 'models/channels'
import { notification } from 'antd'
import { MomentDisplay } from 'components/MomentDisplay'

interface BpHistoryUtils {
  loading: boolean
  source: BpHistoryItem[]
  paginationConfig: false | TablePaginationConfig
  columnOrderUtils: ColumnOrderUtils<BpHistoryItem>
  templateModal: {
    title: string | null
    content: string | null
  }
  handleResetFilters: () => void
  handleTemplateCloseClick: () => void
  handleTableChange: () => void
  loadHistory: () => void
}

export const useBpHistoryUtils = (): BpHistoryUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { bpHistoryItems, loading, listParams, template } = useSelector(
    (state: RootState) => state.bpHistory
  )

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

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('bp-history.field.campaignName'),
        key: 'campaignName',
        sort: true
      },
      {
        title: t('bp-history.field.campaignTechnicalName'),
        key: 'campaignTechnicalName',
        sort: true
      },
      {
        title: t('bp-history.field.createdDate'),
        key: 'createdDate',
        sort: true,
        render(value) {
          return <MomentDisplay date={value} />
        }
      },
      {
        title: t('bp-history.field.bpCode'),
        key: 'bpId',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('bp-history.field.contact'),
        key: 'contact',
        sort: true
      },
      {
        title: t('bp-history.field.channelName'),
        key: 'channelId',
        sort: true,
        render(value) {
          return <>{t(`enum.channel-type.${Channels[value]}`)}</>
        }
      },
      {
        title: t('bp-history.field.event'),
        key: 'event',
        sort: true
      },
      {
        title: t('bp-history.field.eventResult'),
        key: 'eventResult',
        sort: true
      },
      {
        title: t('bp-history.field.campaignResult'),
        key: 'campaignResult',
        sort: true
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams>>(
    () => ({
      fixed: 'right',
      width: '50px',
      render(record: BpHistoryItem) {
        return <CrudButtons onView={() => handleTemplateViewClick(record.templateId)} />
      }
    }),
    [handleTemplateViewClick]
  )

  const { paginationConfig, addKeyProp, handleTableChange, columnsConfig } = useTableUtils<
    BpHistoryItem
  >({
    listParamsState: listParams,
    getDataAction: getBpHistory,
    columnParams,
    actionColumnParams
  })

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.BP_HISTORY)

  const source = useMemo(() => addKeyProp(bpHistoryItems), [addKeyProp, bpHistoryItems])

  const templateModal = useMemo(
    () => ({
      content: template?.body || null,
      title: template?.subject || null
    }),
    [template]
  )

  const loadHistory = useCallback(() => dispatch(getBpHistory()), [dispatch])

  return {
    loading,
    columnOrderUtils,
    paginationConfig,
    templateModal,
    source,
    handleResetFilters,
    handleTemplateCloseClick,
    handleTableChange,
    loadHistory
  }
}
