import React, { useEffect, useMemo } from 'react'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { Partner } from 'models/partner'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'
import { AddButton } from 'components/buttons/AddButton'
import { useTranslation } from 'react-i18next'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { getPartners } from './partnerListSlice'
import { ColumnType } from 'antd/lib/table'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { hasPermission } from 'services/jwt-reader'
import { history } from 'router/router'
import { partnersEditorRoles } from '../partnerEditor/PartnerEditorPage'
import { PartnerRegistrationStateDisplay } from 'components/PartnerRegistrationStateDisplay'
import { PartnerRegistrationState, PartnerState } from 'api/coupon-api/models'
import { ActivenessStatus } from 'components/ActivenessDisplay'
import { useColumnOrder } from 'components/table-columns/useColumnOrder'
import { ColumnStorageName } from 'components/table-columns/ColumnStorageName'
import { ColumnOrderDropdown } from 'components/table-columns/ColumnOrderDropdown'

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
        filterMode: FilterMode.ACTIVE_INACTIVE,
        activenessOptions: {
          active: t(`partner.partner-state.active`),
          inactive: t(`partner.partner-state.inactive`),
          deleted: t(`partner.partner-state.deleted`)
        },
        activenessMapper: (x: PartnerState) => x.toLowerCase() as ActivenessStatus
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

  const columnOrder = useColumnOrder(columnsConfig, ColumnStorageName.PARTNER)

  const headerOptions = (
    <>
      {hasPermission(partnersEditorRoles) ? (
        <AddButton onClick={() => history.push(`/partners/new`)}>{t('partner.list.add')}</AddButton>
      ) : (
        undefined
      )}
      <ColumnOrderDropdown {...columnOrder} />
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
            columns: columnOrder.currentColumns,
            dataSource: addKeyProp(partners),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>
    </>
  )
}
