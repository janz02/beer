import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BpHistoryViewer } from '../components/BpHistoryViewer'
import { useBpHistoryUtils } from '../useBpHistoryUtils'

export const BpHistoryListPage: React.FC = () => {
  const { t } = useTranslation()
  const {
    loading,
    columnOrderUtils,
    paginationConfig,
    templateModal,
    source,
    handleResetFilters,
    handleTemplateCloseClick,
    handleTableChange,
    loadHistory
  } = useBpHistoryUtils()

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
            <ColumnOrderDropdown {...columnOrderUtils} />
          </>
        }
        forTable
        width="full"
      >
        <ResponsiveTable
          loading={loading}
          columns={columnOrderUtils.currentColumns}
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
