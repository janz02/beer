import React, { FC, useEffect, useMemo, useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useIsMobile } from 'hooks'
import '../sites.scss'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch, useSelector } from 'react-redux'
import { getSites } from '../siteSlice'
import { useTranslation } from 'react-i18next'
import { Button, Tooltip } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/Table'
import { basePaginationConfig, projectPage } from 'models/pagination'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { SiteDeletePopup } from './SiteDeletePopup'

export const SitesPage: FC = () => {
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const sites = useSelector((state: RootState) => state.sites.sites)
  const pagination = useSelector((state: RootState) => state.sites.pagination)
  const error = useSelector((state: RootState) => state.sites.errorList)

  const [siteToDelete, setSiteToDelete] = useState<{
    site: Site
    popupVisible: boolean
  }>()

  useEffect(() => {
    dispatch(getSites())
  }, [dispatch])

  const columnsConfig = useMemo(
    () => [
      {
        title: t('common.data'),
        key: 'data',
        render(value: unknown, record: Site) {
          return (
            <>
              <h4>{record.name}</h4>
              <p>{record.address}</p>
            </>
          )
        }
      },
      {
        title: t('common.actions'),
        key: 'actions',
        className: 'category-list__col--action',
        colSpan: 1,
        render(value: unknown, record: Site) {
          return (
            <>
              <Tooltip mouseEnterDelay={0.5} placement="topRight" title={t('common.edit')}>
                <Button onClick={() => {}}>
                  <EditOutlined />
                </Button>
              </Tooltip>
              <Tooltip mouseEnterDelay={0.5} placement="topRight" title={t('common.delete')}>
                <Button
                  danger
                  onClick={() => {
                    console.log('DDLe')

                    setSiteToDelete({
                      site: record,
                      popupVisible: true
                    })
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          )
        }
      }
    ],
    [t]
  )

  const paginationConfig = useMemo(
    (): TablePaginationConfig => ({
      ...basePaginationConfig(pagination!, isMobile, !error),
      onShowSizeChange: (current, size) => {
        dispatch(getSites({ page: projectPage(size, pagination!), pageSize: size }))
      },
      onChange: (page, c) => {
        dispatch(getSites({ page }))
      }
    }),
    [dispatch, error, isMobile, pagination]
  )

  const headerOptions = (): JSX.Element => (
    <Button type="primary" onClick={() => {}}>
      {t('common.create')}
    </Button>
  )

  return (
    <>
      <div className={`sites-page ${isMobile ? 'category-page--mobile' : ''}`}>
        <ResponsiveCard>
          <ResponsiveTable
            headerTitle={t('sites.list-title')}
            headerOptions={headerOptions}
            tableProps={{
              columns: columnsConfig,
              dataSource: sites.map((c, i) => ({ ...c, key: '' + i + c.id })),
              pagination: sites.length ? paginationConfig : false
            }}
            error={error}
          />
        </ResponsiveCard>
      </div>
      <SiteDeletePopup
        afterClose={() => setSiteToDelete(undefined)}
        onExit={() => setSiteToDelete({ ...siteToDelete!, popupVisible: false })}
        site={siteToDelete?.site}
        visible={!!siteToDelete?.popupVisible}
      />
    </>
  )
}
