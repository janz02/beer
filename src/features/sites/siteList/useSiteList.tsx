import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useTableUtils, FilterMode, ListRequestParams } from 'hooks/useTableUtils'
import { Site } from 'models/site'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { ColumnType } from 'antd/lib/table'
import { history } from 'router/router'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { siteListActions, SiteFeatureConfig } from './siteListSlice'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { FeatureState } from 'models/featureState'

interface UseSiteListProps {
  config: SiteFeatureConfig
}
interface UseSiteListUtils {
  deletePopupProps: GenericPopupProps
  tableProps: ResponsiveTableProps
  siteToDelete: PopupState<Site> | undefined | null
  handleGetSites: () => void
  handleAdd: () => void
  resetFilters: () => void
}
export const useSiteList = (props: UseSiteListProps): UseSiteListUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { listParams, sites, listState, config } = useSelector((s: RootState) => s.siteList)
  const [siteToDelete, setSiteToDelete] = useState<PopupState<Site>>()
  const { routeRoot } = config

  useEffect(() => {
    dispatch(siteListActions.setFeatureConfig(props.config))
  }, [dispatch, props.config])

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Site>({
    listParamsState: listParams,
    filterKeys: ['name', 'address'],
    getDataAction: siteListActions.getSites
  })

  const resetFilters = (): void => {
    dispatch(siteListActions.resetSiteFilters)
  }

  const handleAdd = useCallback((): void => history.push(routeRoot), [routeRoot])

  const handleEdit = useCallback(
    (id: number): void => {
      history.push(`${routeRoot}/${id}`)
    },
    [routeRoot]
  )

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
    [actionColumnConfig, columnConfig, t, handleEdit]
  )

  const handleGetSites = useCallback(
    (params?: ListRequestParams) => {
      dispatch(siteListActions.setListConstraints({ partnerId: 2 }))
      dispatch(siteListActions.getSites(params))
    },
    [dispatch]
  )

  const tableProps: ResponsiveTableProps = {
    loading: listState === FeatureState.Loading,
    columns: columnsConfig,
    dataSource: addKeyProp(sites),
    pagination: paginationConfig,
    onChange: handleTableChange
  }

  const deletePopupProps: GenericPopupProps = {
    type: 'delete',
    id: siteToDelete?.data?.id!,
    visible: !!siteToDelete?.popupVisible,
    onCancel: () => setSiteToDelete({ ...siteToDelete, popupVisible: false }),
    onOkAction: siteListActions.deleteSite(siteToDelete?.data?.id!),
    afterClose: () => setSiteToDelete(null)
  }

  return { tableProps, handleGetSites, handleAdd, deletePopupProps, siteToDelete, resetFilters }
}
