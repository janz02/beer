import React, { useState, useEffect, useMemo, FC } from 'react'
import './CampaignListPage.scss'
import { Checkbox } from 'antd'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { history } from 'router/router'
import { Coupon } from 'models/coupon'
import { useTranslation } from 'react-i18next'
import {
  CouponState,
  Roles,
  CouponType,
  CouponMode,
  CouponRank,
  CouponDiscountType
} from 'api/swagger/models'
import { ColumnType, ColumnFilterItem } from 'antd/lib/table/interface'
import { MomentDisplay } from 'components/MomentDisplay'
import { hasPermission } from 'services/jwt-reader'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { ResponsiveCard } from 'components/responsive/ResponsiveCard'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { GenericPopup } from 'components/popups/GenericPopup'
import { AddButton } from 'components/buttons/AddButton'
import { CampaignStateDisplay } from 'components/CampaignStateDisplay'
import moment from 'moment'
import { Thumbnail } from 'components/thumbnail/Thumbnail'
import { CampaignActiveDisplay } from 'components/CampaignActiveDisplay'
import { campaignActions } from '../campaignsSlice'
import { FeatureState } from 'models/featureState'
import { campaignListActions } from './campaignListSlice'
import { ResponsiveTable } from 'components/responsive/ResponsiveTable'

const couponCreateRoles = [Roles.Administrator, Roles.CampaignManager, Roles.PartnerContactEditor]

const couponEditorRoles = [
  Roles.Administrator,
  Roles.CampaignManager,
  Roles.PartnerContactApprover,
  Roles.PartnerContactEditor
]

export const CampaignListPage: FC = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { categories } = useSelector((state: RootState) => state.campaigns)
  const { coupons, featureState, listParams } = useSelector(
    (state: RootState) => state.campaignList
  )
  const loading = featureState === FeatureState.Loading

  const [couponToDelete, setCouponToDelete] = useState<{
    coupon?: Coupon
    popupVisible?: boolean
  } | null>()

  useEffect(() => {
    dispatch(campaignActions.getCategories())
  }, [dispatch])

  useEffect(() => {
    dispatch(campaignListActions.getCoupons())
  }, [dispatch])

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<Coupon>({
    listParamsState: listParams,
    filterKeys: [
      'type',
      'partnerName',
      'name',
      'state',
      'isActive',
      'categoryId',
      'rank',
      'drawDate',
      'startDate',
      'endDate',
      'expireDate',
      'mode',
      'discountType',
      'discountValue',
      'couponCount',
      'minimumShoppingValue',
      'createdBy'
    ],
    getDataAction: campaignListActions.getCoupons
  })

  const columnsConfig = useMemo(
    (): ColumnType<Coupon>[] => [
      columnConfig({
        title: t('coupon-list.campaign-type'),
        key: 'type',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponType).map(f => {
          return { text: t(`coupon.type.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render(value) {
          return t(`coupon.type.${value?.toLowerCase()}`)
        }
      }),
      columnConfig({
        title: t('coupon-list.partner'),
        ellipsis: false,
        key: 'partnerName',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.view-count'),
        ellipsis: false,
        key: 'showCount'
      }),
      columnConfig({
        title: t('coupon-list.click-count'),
        ellipsis: false,
        key: 'clickCount'
      }),
      columnConfig({
        title: t('coupon-list.redeem-count'),
        ellipsis: false,
        key: 'claimCount'
      }),
      columnConfig({
        title: t('coupon-list.name'),
        ellipsis: false,
        width: '10rem',
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.state'),
        key: 'state',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponState).map(f => {
          return { text: t(`coupon.state.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render(value: CouponState) {
          return <CampaignStateDisplay state={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.status'),
        key: 'isActive',
        ellipsis: false,
        width: '5rem',
        filterMode: FilterMode.FILTER,
        filters: [
          { text: t(`coupon.status.active`), value: 'true' },
          { text: t(`coupon.status.inactive`), value: 'false' }
        ],
        render: (value: unknown, coupon: Coupon) => <CampaignActiveDisplay coupon={coupon} />
      }),
      columnConfig({
        title: t('coupon-list.category'),
        key: 'categoryId',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters:
          categories?.map(x => {
            return { text: x.name, value: x.id?.toString() } as ColumnFilterItem
          }) ?? [],
        render(value: string) {
          return categories && categories.find(x => x.id === +value)?.name
        }
      }),
      columnConfig({
        title: t('coupon-list.rank'),
        key: 'rank',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponRank).map(f => {
          return { text: t(`coupon.rank.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render(value) {
          return t(`coupon.rank.${value.toLowerCase()}`)
        }
      }),
      columnConfig({
        title: t('coupon-list.small-image'),
        ellipsis: false,
        key: 'smallPictureId',
        render(value) {
          return value && <Thumbnail fileId={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.start-date'),
        key: 'startDate',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.DATEPICKER,
        render(value: moment.Moment) {
          return <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.end-date'),
        ellipsis: false,
        key: 'endDate',
        sort: true,
        filterMode: FilterMode.DATEPICKER,
        render(value: moment.Moment) {
          return <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.expire-date'),
        key: 'expireDate',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.DATEPICKER,
        render(value: moment.Moment, coupon: Coupon) {
          return coupon.type === CouponType.Discount && <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.draw-date'),
        key: 'drawDate',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.DATEPICKER,
        render(value: moment.Moment, coupon: Coupon) {
          return coupon.type === CouponType.Prize && <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-list.mode'),
        key: 'mode',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponMode).map(f => {
          return { text: t(`coupon.mode.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render(value: CouponMode) {
          return value ? t(`coupon.mode.${value.toLowerCase()}`) : ''
        }
      }),
      columnConfig({
        title: t('coupon-list.discount-type'),
        key: 'discountType',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponDiscountType).map(f => {
          return {
            text: t(`coupon.discount-type.${f?.toLowerCase()}`),
            value: f
          } as ColumnFilterItem
        }),
        render(value) {
          return value ? t(`coupon.discount-type.${value.toLowerCase()}`) : ''
        }
      }),
      columnConfig({
        title: t('coupon-list.discount-amount'),
        ellipsis: false,
        key: 'discountValue',
        sort: true,
        filterMode: FilterMode.SEARCH,
        disableSearchHighlight: true,
        render(value) {
          return !!value && value
        }
      }),
      columnConfig({
        title: t('coupon-list.coupon-count'),
        ellipsis: false,
        key: 'couponCount',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-list.minimum-shopping-value'),
        key: 'minimumShoppingValue',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.SEARCH,
        disableSearchHighlight: true,
        render(value) {
          return !!value && value
        }
      }),
      // TODO: integrate
      // columnConfig({
      //   title: t('coupon-list.preferred-position'),
      //   ellipsis: false,
      //   key: 'preferredPosition',
      //   sort: true,
      //   filterMode: FilterMode.SEARCH
      // }),
      columnConfig({
        title: t('coupon-list.user'),
        ellipsis: false,
        key: 'createdBy',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        fixed: 'right',
        render(record: Coupon) {
          return (
            <CrudButtons
              onView={() => history.push(`/campaign/${record.id}`)}
              onEdit={
                hasPermission(couponEditorRoles)
                  ? () => history.push(`/campaign/${record.id}/edit`)
                  : undefined
              }
              onDelete={
                hasPermission(couponEditorRoles) &&
                (record.state === CouponState.Created || record.state === CouponState.Waiting)
                  ? () => {
                      setCouponToDelete({
                        coupon: record,
                        popupVisible: true
                      })
                    }
                  : undefined
              }
            />
          )
        }
      })
    ],
    [actionColumnConfig, categories, columnConfig, t]
  )

  const headerOptions = (
    <>
      <Checkbox
        onChange={e => {
          dispatch(campaignListActions.setIncludeArchived(e.target.checked))
          dispatch(campaignListActions.getCoupons())
        }}
      >
        {t('coupon-list.show-archived')}
      </Checkbox>
      {hasPermission(couponCreateRoles) && (
        <AddButton onClick={() => history.push(`/campaign`)}>{t('coupon-list.add')}</AddButton>
      )}
    </>
  )

  const tableSelector = [
    {
      key: 'all',
      tab: t('coupon-list.all-tab')
    },
    {
      key: 'waiting',
      tab: t('coupon-list.pending-tab')
    }
  ]

  return (
    <>
      <ResponsiveCard
        disableAutoScale
        forTable
        floatingTitle={t('coupon-list.campaigns')}
        floatingOptions={headerOptions}
        paddedBottom
        width="full"
        tabList={tableSelector}
        onTabChange={key => {
          dispatch(campaignListActions.setOnlyWaiting(key === 'waiting'))
          dispatch(campaignListActions.getCoupons())
        }}
      >
        <ResponsiveTable
          hasFixedColumn
          {...{
            loading: loading,
            columns: columnsConfig,
            dataSource: addKeyProp(coupons),
            pagination: paginationConfig,
            onChange: handleTableChange
          }}
        />
      </ResponsiveCard>

      <GenericPopup
        id={couponToDelete?.coupon?.id}
        type="delete"
        visible={!!couponToDelete?.popupVisible}
        onOkAction={campaignListActions.deleteCoupon(couponToDelete?.coupon?.id!)}
        onCancel={() => setCouponToDelete({ ...couponToDelete, popupVisible: false })}
        afterClose={() => setCouponToDelete(null)}
      />
    </>
  )
}
