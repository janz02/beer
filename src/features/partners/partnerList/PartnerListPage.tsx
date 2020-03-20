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
import { PartnerState } from 'api/swagger/models/PartnerState'
import { ColumnFilterItem } from 'antd/lib/table/interface'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { hasPermission } from 'services/jwt-reader'
import { history } from 'router/router'

export const PartnerListPage: React.FC = () => {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const { partners, loading, listParams } = useSelector((state: RootState) => state.partnerList)

  useEffect(() => {
    dispatch(getPartners())
  }, [dispatch])

  const { paginationConfig, handleTableChange, columnConfig } = useTableUtils<Partner>({
    listParamsState: listParams,
    filterKeys: ['name', 'majorPartner', 'partnerState', 'address'],
    getDataAction: getPartners
  })

  const columnsConfig = useMemo(
    (): ColumnType<Partner>[] => [
      columnConfig({
        title: t('partner.field.name'),
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('partner.field.major-partner'),
        key: 'majorPartner',
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: [
          { text: t('common.yes'), value: 'true' },
          { text: t('common.no'), value: 'false' }
        ],
        render: value => (value ? t('common.yes') : t('common.no'))
      }),
      columnConfig({
        title: t('partner.field.partner-state'),
        key: 'partnerState',
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(PartnerState).map(f => {
          return {
            text: t(`partner.partner-state.${f?.toLowerCase()}`),
            value: f
          } as ColumnFilterItem
        }),
        render: value => t(`partner.partner-state.${value?.toLowerCase()}`)
      }),
      columnConfig({
        title: t('partner.field.address'),
        key: 'address',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      {
        key: 'action',
        render(record: Partner) {
          return (
            <CrudButtons
              onView={() => history.push(`/partner/${record.id}`)}
              onEdit={
                hasPermission([]) ? () => history.push(`/partner/${record.id}/edit`) : undefined
              }
            />
          )
        }
      }
    ],
    [columnConfig, t]
  )

  const headerOptions = (
    <AddButton onClick={() => history.push(`/partner`)}>{t('partner.list.add')}</AddButton>
  )

  return (
    <>
      <ResponsiveCard
        floatingTitle={t('partner.list.title')}
        floatingOptions={headerOptions}
        forTable
        extraWide
      >
        <ResponsiveTable
          {...{
            loading,
            columns: columnsConfig,
            dataSource: partners.map((t, i) => ({ ...t, key: '' + i + t.id })),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>
    </>
  )
}
