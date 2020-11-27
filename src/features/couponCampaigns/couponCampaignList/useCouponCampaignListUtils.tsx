import React, { useMemo, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { couponCampaignActions } from '../couponCampaignsSlice'
import { CouponCampaign } from 'models/couponCampaign'
import { useTableUtils, FilterMode } from 'hooks/useTableUtils'
import { couponCampaignListActions, CouponListTabKey } from './couponCampaignListSlice'
import { ColumnType } from 'antd/lib/table'
import { useTranslation } from 'react-i18next'
import { ColumnFilterItem, TablePaginationConfig } from 'antd/lib/table/interface'
import { CouponCampaignStateDisplay } from 'components/CouponCampaignStateDisplay'
import { Thumbnail } from 'components/thumbnail/Thumbnail'
import moment from 'moment'
import { history } from 'router/router'
import { MomentDisplay } from 'components/MomentDisplay'
import { CrudButtons } from 'components/buttons/CrudButtons'
import { hasPermission } from 'services/jwt-reader'
import {
  Roles,
  CouponType,
  CouponState,
  CouponRank,
  CouponMode,
  CouponDiscountType
} from 'api/swagger/coupon'
import { isCouponActive } from 'components/CouponCampaignActiveDisplay'
import { CouponCampaignTypeDisplay } from 'components/CouponCampaignTypeDisplay'
import { ThumbNailSize } from 'api/swagger/files'

interface CouponCampaignListUtils {
  loading: boolean
  coupons?: CouponCampaign[]
  activeTabKey: CouponListTabKey
  handleTableChange: any
  columnsConfig: ColumnType<CouponCampaign>[]
  paginationConfig: false | TablePaginationConfig
  couponToDelete?: CouponCampaign
  deletePopupVisible?: boolean
  resetFilters: () => void
  handleIncludeArchivedChange: (checked: boolean) => void
  handleTabChange: (key: CouponListTabKey) => void
  handleDeleteCancel: () => void
  handleExport: () => void
  getCategories: typeof couponCampaignActions.getCategories
  getCoupons: typeof couponCampaignListActions.getCoupons
  deleteCoupon: typeof couponCampaignListActions.deleteCoupon
}

const couponEditorRoles = [
  Roles.Administrator,
  Roles.CampaignManager,
  Roles.PartnerContactApprover,
  Roles.PartnerContactEditor
]

export const useCouponCampaignListUtils = (): CouponCampaignListUtils => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const {
    coupons,
    listParams,
    activeTabKey,
    campaignToDelete: couponToDelete,
    deletePopupVisible,
    featureState
  } = useSelector((state: RootState) => state.couponCampaignList)
  const { categories } = useSelector((state: RootState) => state.couponCampaigns)

  const loading = featureState === FeatureState.Loading

  const {
    paginationConfig,
    handleTableChange,
    columnConfig,
    actionColumnConfig,
    addKeyProp
  } = useTableUtils<CouponCampaign>({
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
    getDataAction: couponCampaignListActions.getCoupons
  })

  const resetFilters = (): void => {
    dispatch(couponCampaignListActions.resetCouponFilters())
  }

  const columnsConfig = useMemo(
    (): ColumnType<CouponCampaign>[] => [
      columnConfig({
        title: t('coupon-campaign-list.campaign-type'),
        key: 'type',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponType).map(f => {
          return { text: t(`coupon.type.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render: (value: CouponType) => <CouponCampaignTypeDisplay type={value} />
      }),
      columnConfig({
        title: t('coupon-campaign-list.partner'),
        ellipsis: false,
        key: 'partnerName',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-campaign-list.view-count'),
        ellipsis: false,
        key: 'showCount'
      }),
      columnConfig({
        title: t('coupon-campaign-list.click-count'),
        ellipsis: false,
        key: 'clickCount'
      }),
      columnConfig({
        title: t('coupon-campaign-list.redeem-count'),
        ellipsis: false,
        key: 'claimCount'
      }),
      columnConfig({
        title: t('coupon-campaign-list.name'),
        ellipsis: false,
        width: '10rem',
        key: 'name',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-campaign-list.state'),
        key: 'state',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.FILTER,
        filters: Object.keys(CouponState).map(f => {
          return { text: t(`coupon.state.${f?.toLowerCase()}`), value: f } as ColumnFilterItem
        }),
        render: (value: CouponState) => <CouponCampaignStateDisplay state={value} />
      }),
      columnConfig({
        title: t('coupon-campaign-list.status'),
        key: 'isActive',
        ellipsis: false,
        width: '5rem',
        filterMode: FilterMode.ACTIVE_INACTIVE
      }),
      columnConfig({
        title: t('coupon-campaign-list.category'),
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
        title: t('coupon-campaign-list.rank'),
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
        title: t('coupon-campaign-list.small-image'),
        ellipsis: false,
        key: 'smallPictureId',
        render(value) {
          return value && <Thumbnail fileId={value} size={ThumbNailSize.Small} />
        }
      }),
      columnConfig({
        title: t('coupon-campaign-list.start-date'),
        key: 'startDate',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.DATEPICKER
      }),
      columnConfig({
        title: t('coupon-campaign-list.end-date'),
        ellipsis: false,
        key: 'endDate',
        sort: true,
        filterMode: FilterMode.DATEPICKER
      }),
      columnConfig({
        title: t('coupon-campaign-list.expire-date'),
        key: 'expireDate',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.DATEPICKER,
        render(value: moment.Moment, coupon: CouponCampaign) {
          return coupon.type === CouponType.Discount && <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-campaign-list.draw-date'),
        key: 'drawDate',
        ellipsis: false,
        sort: true,
        filterMode: FilterMode.DATEPICKER,
        render(value: moment.Moment, coupon: CouponCampaign) {
          return coupon.type === CouponType.Prize && <MomentDisplay date={value} />
        }
      }),
      columnConfig({
        title: t('coupon-campaign-list.mode'),
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
        title: t('coupon-campaign-list.discount-type'),
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
        title: t('coupon-campaign-list.discount-amount'),
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
        title: t('coupon-campaign-list.coupon-count'),
        ellipsis: false,
        key: 'couponCount',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      columnConfig({
        title: t('coupon-campaign-list.minimum-shopping-value'),
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
      //   title: t('coupon-campaign-list.preferred-position'),
      //   ellipsis: false,
      //   key: 'preferredPosition',
      //   sort: true,
      //   filterMode: FilterMode.SEARCH
      // }),
      columnConfig({
        title: t('coupon-campaign-list.user'),
        ellipsis: false,
        key: 'createdBy',
        sort: true,
        filterMode: FilterMode.SEARCH
      }),
      actionColumnConfig({
        fixed: 'right',
        render(record: CouponCampaign) {
          return (
            <CrudButtons
              onView={() => history.push(`/couponCampaign/${record.id}`)}
              onEdit={
                hasPermission(couponEditorRoles)
                  ? () => history.push(`/couponCampaign/${record.id}/edit`)
                  : undefined
              }
              onDelete={
                hasPermission(couponEditorRoles) &&
                (record.state === CouponState.Created || record.state === CouponState.Waiting)
                  ? () => {
                      dispatch(couponCampaignListActions.prepareCampaignDelete(record))
                    }
                  : undefined
              }
            />
          )
        }
      })
    ],
    [actionColumnConfig, categories, columnConfig, t, dispatch]
  )

  const handleIncludeArchivedChange = useCallback(
    (checked: boolean): void => {
      dispatch(couponCampaignListActions.setIncludeArchived(checked))
      dispatch(couponCampaignListActions.getCoupons())
    },
    [dispatch]
  )

  const handleTabChange = useCallback(
    (key: CouponListTabKey): void => {
      dispatch(couponCampaignListActions.setActiveTabKey(key))
      dispatch(couponCampaignListActions.getCoupons())
    },
    [dispatch]
  )

  const handleDeleteCancel = useCallback((): void => {
    dispatch(couponCampaignListActions.cancelCampaignDelete())
  }, [dispatch])

  const handleExport = useCallback((): void => {
    dispatch(couponCampaignListActions.exportCoupons())
  }, [dispatch])

  return {
    loading,
    coupons: addKeyProp(coupons).map(x => ({ ...x, isActive: isCouponActive(x) })),
    activeTabKey,
    handleTableChange,
    columnsConfig,
    paginationConfig,
    couponToDelete,
    deletePopupVisible,
    resetFilters,
    handleIncludeArchivedChange,
    handleTabChange,
    handleDeleteCancel,
    handleExport,
    getCategories: couponCampaignActions.getCategories,
    getCoupons: couponCampaignListActions.getCoupons,
    deleteCoupon: couponCampaignListActions.deleteCoupon
  }
}