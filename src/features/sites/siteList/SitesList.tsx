import React, { FC, useMemo, useState } from 'react'
import { ColumnType } from 'antd/lib/table'
import { useTableUtils, ListRequestParams, FilterMode } from 'hooks/useTableUtils'
import { Site } from 'models/site'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { PopupState, GenericPopup } from 'components/popups/GenericPopup'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { ResponsiveCard, ResponsiveCardProps } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AppThunk } from 'app/store'
import { useReusableSites } from '../useReusableSites'

export interface SitesListProps {
  cardProps: Pick<ResponsiveCardProps, 'disableAutoScale'>
  hidden?: boolean
  sites?: Site[]
  loading: boolean
  listParamsState: ListRequestParams
  getDataAction: (params: ListRequestParams) => any
  handleEdit: (id: number) => void
  handleAdd: () => void
  deleteAction?: (id: number) => AppThunk
}

export const SitesList: FC<SitesListProps> = props => {
  const { sites, loading, getDataAction, listParamsState, hidden, cardProps } = props
  const { handleAdd, handleEdit, deleteAction } = props
  const { t } = useTranslation()

  const [siteToDelete, setSiteToDelete] = useState<PopupState<Site>>()

  const { listWidth } = useReusableSites()

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Site>({
    listParamsState,
    filterKeys: ['name', 'address'],
    getDataAction
  })

  const columnsConfig: ColumnType<Site>[] = useMemo(
    () => [
      columnConfig({
        title: t('site-list.table.name'),
        key: 'name',
        width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('site-list.table.address'),
        key: 'address',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        render(value: unknown, record: Site) {
          return (
            <>
              <CrudButtons
                onEdit={() => record.id && handleEdit(record.id)}
                onDelete={() => {
                  setSiteToDelete({
                    data: record,
                    popupVisible: true
                  })
                }}
              />
            </>
          )
        }
      })
    ],
    [actionColumnConfig, columnConfig, handleEdit, t]
  )

  const headerOptions = <AddButton onClick={handleAdd}>{t('site-list.add')}</AddButton>

  return (
    <>
      {!hidden && (
        <ResponsivePage>
          <ResponsiveCard
            {...cardProps}
            width={listWidth}
            forTable
            floatingTitle={t('site-list.list-title')}
            floatingOptions={headerOptions}
          >
            <ResponsiveTable
              {...{
                loading,
                columns: columnsConfig,
                dataSource: addKeyProp(sites),
                pagination: paginationConfig,
                onChange: handleTableChange
              }}
            />
          </ResponsiveCard>
        </ResponsivePage>
      )}

      <GenericPopup
        type="delete"
        id={siteToDelete?.data?.id!}
        visible={!!siteToDelete?.popupVisible}
        onCancel={() => setSiteToDelete({ ...siteToDelete, popupVisible: false })}
        onOkAction={deleteAction?.(siteToDelete?.data?.id!)}
        afterClose={() => setSiteToDelete(null)}
      >
        <h4>{siteToDelete?.data?.name}</h4>
        <p>{siteToDelete?.data?.address}</p>
      </GenericPopup>
    </>
  )
}
