import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { BpHistoryViewer } from './BpHistoryViewer'
import { useBpHistoryControl } from './useBpHistoryControl'

export const BpHistoryListPage: React.FC = () => {
  const { t } = useTranslation()
  const control = useBpHistoryControl()

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('bp-history.list.title')}
        floatingOptions={
          <>
            <ResetFiltersButton onClick={control.handleResetFilters} />
            <ColumnOrderDropdown {...control.columnOrder} />
          </>
        }
        forTable
        width="full"
      >
        <ResponsiveTable
          loading={control.loading}
          columns={control.columnOrder.currentColumns}
          dataSource={control.source}
          pagination={control.paginationConfig}
          scroll={{ x: true }}
          onChange={control.handleTableChange}
        />
      </ResponsiveCard>
      <BpHistoryViewer
        title={control.templateModal.title}
        content={control.templateModal.content}
        onCancel={control.handleTemplateCloseClick}
      />
    </>
  )
}
