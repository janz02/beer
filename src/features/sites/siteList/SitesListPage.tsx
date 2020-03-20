import React, { FC, useEffect, useMemo, useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch, useSelector } from 'react-redux'
import { getSites, deleteSite } from './siteListSlice'
import { useTranslation } from 'react-i18next'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { GenericPopup } from 'components/popups/GenericPopup'
import { history } from 'router/router'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { ColumnType } from 'antd/lib/table'
import { AddButton } from 'components/buttons/AddButton'

export const SitesListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sites, listParams, loading } = useSelector((state: RootState) => state.siteList)
  const [siteToDelete, setSiteToDelete] = useState<{
    site?: Site
    popupVisible?: boolean
  } | null>()

  useEffect(() => {
    dispatch(getSites())
  }, [dispatch])

  const { paginationConfig, handleTableChange, columnConfig } = useTableUtils<Site>({
    listParamsState: listParams,
    filterKeys: ['name', 'address'],
    getDataAction: getSites
  })

  const columnsConfig: ColumnType<Site>[] = useMemo(
    () => [
      columnConfig({
        title: t('site-list.table.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('site-list.table.address'),
        key: 'address',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      {
        title: '',
        key: 'actions',
        width: '100px',
        colSpan: 1,
        render(value: unknown, record: Site) {
          return (
            <>
              <CrudButtons
                onEdit={() => history.push(`/sites/editor/${record.id}`)}
                onDelete={() => {
                  setSiteToDelete({
                    site: record,
                    popupVisible: true
                  })
                }}
              />
            </>
          )
        }
      }
    ],
    [columnConfig, t]
  )

  const headerOptions = (
    <AddButton onClick={() => history.push(`/sites/editor`)}>{t('site-list.add')}</AddButton>
  )

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard
          forTable
          floatingTitle={t('site-list.list-title')}
          floatingOptions={headerOptions}
          extraWide
        >
          <ResponsiveTable
            {...{
              loading,
              columns: columnsConfig,
              dataSource: sites.map((c, i) => ({ ...c, key: '' + i + c.id })),
              pagination: paginationConfig,
              onChange: handleTableChange
            }}
          />
        </ResponsiveCard>
      </ResponsivePage>

      <GenericPopup
        type="delete"
        id={siteToDelete?.site?.id!}
        visible={!!siteToDelete?.popupVisible}
        onCancel={() => setSiteToDelete({ ...siteToDelete, popupVisible: false })}
        onOkAction={deleteSite(siteToDelete?.site?.id!)}
        afterClose={() => setSiteToDelete(null)}
      >
        <h4>{siteToDelete?.site?.name}</h4>
        <p>{siteToDelete?.site?.address}</p>
      </GenericPopup>
    </>
  )
}
