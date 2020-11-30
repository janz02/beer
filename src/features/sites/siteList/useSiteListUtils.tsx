import React, { useState, useMemo, useCallback } from 'react'
import {
  useTableUtils,
  FilterMode,
  ListRequestParams,
  ColumnConfigParams
} from 'hooks/useTableUtils'
import { Site } from 'models/site'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { siteListActions } from './siteListSlice'
import { useTranslation } from 'react-i18next'
import { PopupState, GenericPopupProps } from 'components/popups/GenericPopup'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { FeatureState } from 'models/featureState'
import { getSiteListRootPath } from '../siteEditor/site/useSiteEditorFormUtils'

export interface SiteFeatureConfig {
  canEdit: boolean
  shrinks: boolean
}

interface SiteListUtilsProps {
  config: SiteFeatureConfig
  partnerEditorPage?: boolean
  partnerId: number
}

interface SiteListUtils {
  deletePopupProps: GenericPopupProps
  tableProps: ResponsiveTableProps
  siteToDelete: PopupState<Site> | undefined | null
  handleGetSites: () => void
  handleAdd: () => void
  resetFilters: () => void
  handleExport: () => void
}

export const useSiteListUtils = ({
  config,
  partnerId,
  partnerEditorPage
}: SiteListUtilsProps): SiteListUtils => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { listParams, sites, listState } = useSelector((s: RootState) => s.siteList)
  const [siteToDelete, setSiteToDelete] = useState<PopupState<Site>>()

  const resetFilters = (): void => {
    dispatch(siteListActions.resetSiteFilters)
  }

  const handleExport = useCallback((): void => {
    dispatch(siteListActions.exportSites())
  }, [dispatch])

  const routeRoot = getSiteListRootPath(partnerEditorPage ? partnerId : undefined)
  const handleAdd = useCallback((): void => history.push(routeRoot), [routeRoot])

  const handleEdit = useCallback(
    (id: number): void => {
      history.push(`${routeRoot}/${id}`)
    },
    [routeRoot]
  )

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('site-list.table.name'),
        key: 'name',
        width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('site-list.table.address'),
        key: 'address',
        sort: true,
        filterMode: FilterMode.SEARCH
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams>>(
    () => ({
      render(value: unknown, record: Site) {
        let onView
        let onEdit
        let onDelete

        if (config.canEdit) {
          onEdit = () => record.id && handleEdit(record.id)
          onDelete = () => {
            setSiteToDelete({
              data: record,
              popupVisible: true
            })
          }
        } else {
          onView = () => record.id && handleEdit(record.id)
        }

        return (
          <>
            <CrudButtons onView={onView} onEdit={onEdit} onDelete={onDelete} />
          </>
        )
      }
    }),
    [handleEdit, config]
  )

  const { paginationConfig, handleTableChange, columnsConfig, addKeyProp } = useTableUtils<Site>({
    listParamsState: listParams,
    getDataAction: siteListActions.getSites,
    columnParams,
    actionColumnParams
  })

  const handleGetSites = useCallback(
    (params?: ListRequestParams) => {
      dispatch(siteListActions.setListConstraints({ partnerId }))
      dispatch(siteListActions.getSites(params))
    },
    [dispatch, partnerId]
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

  return {
    tableProps,
    handleGetSites,
    handleAdd,
    deletePopupProps,
    siteToDelete,
    resetFilters,
    handleExport
  }
}
