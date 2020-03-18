import React, { FC, useEffect, useMemo, useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch, useSelector } from 'react-redux'
import { getSites, deleteSite } from './siteListSlice'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'

import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { GenericPopup } from 'components/popups/GenericPopup'
import { history } from 'router/router'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResponsivePage } from 'components/responsive/ResponsivePage'
import { useTableUtils } from 'hooks/useTableUtils'
import { ColumnType } from 'antd/lib/table'
import { PlusOutlined } from '@ant-design/icons'

export const SitesListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { sites, pagination } = useSelector((state: RootState) => state.siteList)
  const [siteToDelete, setSiteToDelete] = useState<{
    site?: Site
    popupVisible?: boolean
  } | null>()

  useEffect(() => {
    dispatch(getSites())
  }, [dispatch])

  const { paginationConfig, handleTableChange, sorterConfig } = useTableUtils({
    paginationState: pagination,
    getDataAction: getSites
  })

  const columnsConfig: ColumnType<Site>[] = useMemo(
    () => [
      {
        title: t('site-list.table.name'),
        key: 'name',
        dataIndex: 'name',
        ...sorterConfig
      },
      {
        title: t('site-list.table.address'),
        key: 'address',
        dataIndex: 'address',
        ...sorterConfig
      },

      {
        title: '',
        key: 'actions',
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
    [sorterConfig, t]
  )

  const headerOptions = (
    <Button
      type="primary"
      onClick={() => history.push(`/sites/editor`)}
      icon={<PlusOutlined />}
      size="large"
    >
      {t('site-list.add')}
    </Button>
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
              columns: columnsConfig,
              dataSource: sites.map((c, i) => ({ ...c, key: '' + i + c.id })),
              pagination: paginationConfig,
              onChange: handleTableChange,
              size: 'small'
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
