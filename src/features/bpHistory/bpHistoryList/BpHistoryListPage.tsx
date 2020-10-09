import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BpHistoryViewer } from '../components/BpHistoryViewer'
import { useBpHistoryControl } from '../useBpHistoryControl'

export const BpHistoryListPage: React.FC = () => {
  const { t } = useTranslation()
  const {
    loading,
    columnOrder,
    paginationConfig,
    templateModal,
    source,
    handleResetFilters,
    handleTemplateCloseClick,
    handleTableChange,
    loadHistory
  } = useBpHistoryControl()

  useEffect(() => {
    loadHistory()
  }, [loadHistory])

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('bp-history.list.title')}
        floatingOptions={
          <>
            <ResetFiltersButton onClick={handleResetFilters} />
            <ColumnOrderDropdown {...columnOrder} />
          </>
        }
        forTable
        width="full"
      >
        <ResponsiveTable
          loading={loading}
          columns={columnOrder.currentColumns}
          dataSource={source}
          pagination={paginationConfig}
          scroll={{ x: true }}
          onChange={handleTableChange}
        />
      </ResponsiveCard>
      <BpHistoryViewer
        title={templateModal.title}
        content={templateModal.content}
        onCancel={handleTemplateCloseClick}
      />
    </>
  )
}
