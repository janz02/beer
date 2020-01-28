import React, { FC, useEffect, useMemo, useState } from 'react'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useIsMobile } from 'hooks'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { useDispatch, useSelector } from 'react-redux'
import { getSites, deleteSite } from './siteListSlice'
import { useTranslation } from 'react-i18next'
import { Button } from 'antd'
import { TablePaginationConfig } from 'antd/lib/table/Table'
import { basePaginationConfig, projectPage } from 'models/pagination'
import { RootState } from 'app/rootReducer'
import { Site } from 'models/site'
import { GenericPopup } from 'components/popups/GenericPopup'
import { history } from 'router/router'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResponsivePage } from 'components/responsive/ResponsivePage'

export const SitesListPage: FC = () => {
  const isMobile = useIsMobile()
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const sites = useSelector((state: RootState) => state.siteList.sites)
  const pagination = useSelector((state: RootState) => state.siteList.pagination)
  const error = useSelector((state: RootState) => state.siteList.errorList)

  const [siteToDelete, setSiteToDelete] = useState<{
    site?: Site
    popupVisible?: boolean
  } | null>()

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
    [t]
  )

  const paginationConfig = useMemo((): TablePaginationConfig | false => {
    const baseConfig = basePaginationConfig(isMobile, !!error, pagination)
    return baseConfig.total
      ? {
          ...baseConfig,
          onShowSizeChange: (current, size) => {
            dispatch(getSites({ page: projectPage(size, pagination), pageSize: size }))
          },
          onChange: page => {
            dispatch(getSites({ page }))
          }
        }
      : false
  }, [dispatch, error, isMobile, pagination])

  const headerOptions = (): JSX.Element => (
    <Button type="primary" onClick={() => history.push(`/sites/editor`)}>
      {t('common.create')}
    </Button>
  )

  return (
    <>
      <ResponsivePage>
        <ResponsiveCard>
          <ResponsiveTable
            headerTitle={t('site.list-title')}
            headerOptions={headerOptions}
            tableProps={{
              columns: columnsConfig,
              dataSource: sites.map((c, i) => ({ ...c, key: '' + i + c.id })),
              pagination: paginationConfig
            }}
            error={error}
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
        <p>{t(`common.popup.delete-text`)}</p>
        <h4>{siteToDelete?.site?.name}</h4>
        <p>{siteToDelete?.site?.address}</p>
      </GenericPopup>
    </>
  )
}
