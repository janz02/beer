import React, { useCallback, useEffect, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { Partner } from 'models/partner'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { getPartners, resetPartnerFilters, exportPartners } from './partnerListSlice'
import { ColumnType } from 'antd/lib/table'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { hasPermission } from 'services/jwt-reader'
import { history } from 'router/router'
import { partnersEditorRoles } from '../partnerEditor/PartnerEditorPage'
import { PartnerRegistrationStateDisplay } from 'components/PartnerRegistrationStateDisplay'
import { PartnerRegistrationState } from 'api/swagger/coupon'
import { ResetFiltersButton } from 'components/ResetFiltersButton'
import { useColumnOrderUtils } from 'components/table-columns/useColumnOrderUtils'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'
import { ExportButton } from 'components/buttons/ExportButton'
import { ActivenessDisplay } from 'components/ActivenessDisplay'

export const PartnerListPage: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const { partners, loading, listParams } = useSelector((state: RootState) => state.partnerList)

  useEffect(() => {
    dispatch(getPartners())
  }, [dispatch])

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Partner>({
    listParamsState: listParams,
    filterKeys: ['name', 'majorPartner', 'partnerState', 'address', 'partnerRegistrationState'],
    getDataAction: getPartners
  })

  const resetFilters = (): void => {
    dispatch(resetPartnerFilters())
  }

  const handleExport = useCallback((): void => {
    dispatch(exportPartners())
  }, [dispatch])

  const columnsConfig = useMemo(
    (): ColumnType<Partner>[] => [
      columnConfig({
        title: t('partner.field.name'),
        key: 'name',
        width: '35%',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('partner.field.major-partner'),
        key: 'majorPartner',
        sort: true,
        width: '11rem',
        filterMode: FilterMode.YES_NO
      }),
      columnConfig({
        title: t('partner.field.partner-state'),
        key: 'partnerState',
        sort: true,
        width: '8rem',
        filterMode: FilterMode.ENUM,
        filters: [
          { value: 'Active', text: t('partner.partner-state.active') },
          { value: 'Inactive', text: t('partner.partner-state.inactive') },
          { value: 'Deleted', text: t('partner.partner-state.deleted') }
        ],
        render: value => {
          const activeness = value.toLowerCase()
          return <ActivenessDisplay status={activeness} text={t('common.' + activeness)} />
        }
      }),
      columnConfig({
        title: t('partner.field.partner-registration-state'),
        key: 'partnerRegistrationState',
        sort: true,
        width: '12rem',
        filterMode: FilterMode.FILTER,
        filters: Object.keys(PartnerRegistrationState).map(f => {
          return {
            text: (
              <PartnerRegistrationStateDisplay
                partnerRegistrationState={f as PartnerRegistrationState}
              />
            ),
            value: f
          } as ColumnFilterItem
        }),
        render: (value: PartnerRegistrationState) => (
          <PartnerRegistrationStateDisplay partnerRegistrationState={value} />
        )
      }),
      columnConfig({
        title: t('partner.field.address'),
        key: 'address',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        render(record: Partner) {
          return (
            <CrudButtons
              useRightCircleForView
              onView={() => history.push(`/partners/${record.id}`)}
            />
          )
        }
      })
    ],
    [actionColumnConfig, columnConfig, t]
  )

  const columnOrderUtils = useColumnOrderUtils(columnsConfig, ColumnStorageName.PARTNER)

  const headerOptions = (
    <>
      <ExportButton onClick={handleExport} />
      <ResetFiltersButton onClick={resetFilters} />
      <ColumnOrderDropdown {...columnOrderUtils} />
      {hasPermission(partnersEditorRoles) ? (
        <AddButton onClick={() => history.push(`/partners/new`)}>{t('partner.list.add')}</AddButton>
      ) : (
        undefined
      )}
    </>
  )

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('partner.list.title')}
        floatingOptions={headerOptions}
        forTable
      >
        <ResponsiveTable
          {...{
            loading,
            columns: columnOrderUtils.currentColumns,
            dataSource: addKeyProp(partners),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>
    </>
  )
}
