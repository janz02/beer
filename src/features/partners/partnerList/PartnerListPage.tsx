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
import { partnersEditorRoles } from '../partnerEditor/PartnerEditorPage'
import { PartnerRegistrationStateDisplay } from 'components/PartnerRegistrationStateDisplay'

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
    filterKeys: ['name', 'majorPartner', 'partnerState', 'address'],
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
        title: t('partner.field.registration-state'),
        key: 'registrationState',
        sort: true,
        render: (value: string) => <PartnerRegistrationStateDisplay registrationState={value} />
        // TODO: integration, generate filtering.
      }),
      columnConfig({
        title: t('partner.field.address'),
        key: 'address',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        render(record: Partner) {
          return <CrudButtons onView={() => history.push(`/partners/${record.id}`)} />
        }
      })
    ],
    [actionColumnConfig, columnConfig, t]
  )

  const headerOptions = hasPermission(partnersEditorRoles) ? (
    <AddButton onClick={() => history.push(`/partners/new`)}>{t('partner.list.add')}</AddButton>
  ) : (
    undefined
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
            columns: columnsConfig,
            dataSource: addKeyProp(partners),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>
    </>
  )
}
