import React, { useMemo, useEffect } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { FeatureState } from 'models/featureState'
import { useTableUtils, FilterMode, ColumnConfigParams } from 'hooks/useTableUtils'
import { hasPermission } from 'services/jwt-reader'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { useTranslation } from 'react-i18next'
import { ResponsiveTableProps } from 'components/responsive/ResponsiveTable'
import { SystemParam } from 'models/systemParam'
import { systemParamsActions } from '../systemParamsSlice'
import { pageViewRoles } from 'services/roleHelpers'

interface SystemParamsListUtilsProps {
  onOpenEditor: (id?: number) => void
}

interface SystemParamsListUtils {
  isEditorUser: boolean
  tableProps: ResponsiveTableProps
  resetFilters: () => void
}

export const useSystemParamsListUtils = (
  props: SystemParamsListUtilsProps
): SystemParamsListUtils => {
  const { onOpenEditor } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { listParams, systemParamsList, listState } = useSelector(
    (state: RootState) => state.systemParams
  )

  useEffect(() => {
    dispatch(systemParamsActions.getSystemParams())
  }, [dispatch])

  const isEditorUser = useMemo(() => hasPermission(pageViewRoles.settingsEditor), [])

  const loading = useMemo(() => listState === FeatureState.Loading, [listState])

  const columnParams = useMemo<ColumnConfigParams[]>(
    () => [
      {
        title: t('system-params.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      },
      {
        title: t('system-params.field.description'),
        key: 'description'
      },
      {
        title: t('system-params.field.value'),
        key: 'value',
        sort: true,
        filterMode: FilterMode.SEARCH
      }
    ],
    [t]
  )

  const actionColumnParams = useMemo<Partial<ColumnConfigParams>>(
    () => ({
      render(record: any) {
        return isEditorUser ? (
          <CrudButtons onEdit={() => onOpenEditor(record.id)} />
        ) : (
          <CrudButtons onView={() => onOpenEditor(record.id)} />
        )
      }
    }),
    [onOpenEditor, isEditorUser]
  )

  const { paginationConfig, handleTableChange, columnsConfig, addKeyProp } = useTableUtils<
    SystemParam
  >({
    listParamsState: listParams,
    filterKeys: ['key', 'value'],
    sortWithoutDefaultOption: true,
    getDataAction: () => systemParamsActions.getSystemParams,
    columnParams,
    actionColumnParams
  })

  const tableProps: ResponsiveTableProps = useMemo(
    () => ({
      loading,
      columns: columnsConfig,
      dataSource: addKeyProp(systemParamsList),
      pagination: paginationConfig,
      onChange: handleTableChange
    }),
    [columnsConfig, addKeyProp, systemParamsList, paginationConfig, handleTableChange, loading]
  )

  return {
    isEditorUser,
    tableProps,
    resetFilters: () => dispatch(systemParamsActions.resetSystemParamsFilters())
  }
}
