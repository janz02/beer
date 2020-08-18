import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Category } from 'models/category'
import moment from 'moment'
import { message } from 'antd'
import i18n from 'app/i18n'
import { history } from 'router/router'
import { CouponState, CouponType, CouponMode, CouponDiscountType } from 'api/swagger/models'
import { CouponComment } from 'models/couponComment'
import { Partner } from 'models/partner'
import { saveAs } from 'file-saver'
import { Coupon } from 'models/coupon'
import { FeatureState } from 'models/featureState'

interface CampaignsState {
  coupon?: Coupon
  categories?: Category[]
  majorPartners?: Partner[]
  editing?: boolean
  stateForCreate?: CouponState
  selectedCouponType?: CouponType
  selectedCouponMode?: CouponMode
  selectedCouponDiscountType?: CouponDiscountType
  featureState: FeatureState
}

const initialState: CampaignsState = {
  featureState: FeatureState.Initial
}

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    resetCampaigns: () => initialState,
    setFeatureState(state, action: PayloadAction<FeatureState>) {
      state.featureState = action.payload
    },
    setEditing(state, action: PayloadAction<boolean>) {
      state.editing = action.payload
    },
    setSelectedCouponType(state, action: PayloadAction<CouponType | undefined>) {
      state.selectedCouponType = action.payload
    },
    setSelectedCouponMode(state, action: PayloadAction<CouponMode | undefined>) {
      state.selectedCouponMode = action.payload
    },
    setSelectedCouponDiscountType(state, action: PayloadAction<CouponDiscountType | undefined>) {
      state.selectedCouponDiscountType = action.payload
    },
    setStateForCreate(state, action: PayloadAction<CouponState>) {
      state.stateForCreate = action.payload
    },
    setCoupon(state, action: PayloadAction<Coupon | undefined>) {
      state.coupon = action.payload
    },
    getCouponSuccess(state, action: PayloadAction<Coupon>) {
      state.coupon = action.payload
      state.featureState = FeatureState.Success
    },
    createCouponSuccess(state) {
      message.success(i18n.t('coupon-create.create-coupon-success'), 10)
      state.featureState = FeatureState.Success
    },
    updateCouponSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-success'), 10)
      state.featureState = FeatureState.Success
    },
    deleteCouponCommentsSuccess(state) {
      state.featureState = FeatureState.Success
    },
    getCouponCommentsSuccess(state, action: PayloadAction<CouponComment[]>) {
      if (state.coupon) {
        state.coupon.comments = action.payload
      }
      state.featureState = FeatureState.Success
    },
    activateCouponSuccess(state) {
      state.featureState = FeatureState.Success
    },
    updateCouponStatusSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-status-success'), 10)
      state.featureState = FeatureState.Success
    },
    getCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload
      state.featureState = FeatureState.Success
    },
    getMajorPartnersSuccess(state, action: PayloadAction<Partner[]>) {
      state.majorPartners = action.payload
      state.featureState = FeatureState.Success
    },
    downloadCouponsSuccess(state) {
      state.featureState = FeatureState.Success
    },
    downloadClaimedCouponsSuccess(state) {
      state.featureState = FeatureState.Success
    },
    downloadPrizeFileSuccess(state) {
      state.featureState = FeatureState.Success
    },
    downloadPredefinedCouponsFileSuccess(state) {
      state.featureState = FeatureState.Success
    }
  }
})

const {
  resetCampaigns,
  setFeatureState,
  setEditing,
  setSelectedCouponType,
  setSelectedCouponMode,
  setSelectedCouponDiscountType,
  setStateForCreate,
  setCoupon,
  getCouponSuccess,
  createCouponSuccess,
  updateCouponSuccess,
  deleteCouponCommentsSuccess,
  getCouponCommentsSuccess,
  activateCouponSuccess,
  updateCouponStatusSuccess,
  getCategoriesSuccess,
  getMajorPartnersSuccess,
  downloadCouponsSuccess,
  downloadClaimedCouponsSuccess,
  downloadPrizeFileSuccess,
  downloadPredefinedCouponsFileSuccess
} = campaignsSlice.actions

const getCoupon = (id: number): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const coupon = await api.coupons.getCoupon({ id })
    dispatch(
      getCouponSuccess({
        ...coupon,
        startDate: coupon.startDate && moment(coupon.startDate),
        endDate: coupon.endDate && moment(coupon.endDate),
        expireDate: coupon.expireDate && moment(coupon.expireDate),
        createdDate: coupon.createdDate && moment(coupon.createdDate),
        modifiedDate: coupon.modifiedDate && moment(coupon.modifiedDate),
        approvedDate: coupon.approvedDate && moment(coupon.approvedDate),
        drawDate: coupon.drawDate && moment(coupon.drawDate),
        comments: coupon.comments?.map(x => {
          return { ...x, dateTime: moment(x.dateTime) }
        })
      } as Coupon)
    )
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const createCoupon = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const tags = await api.tags.getTags({})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tagId = (tags && tags.result && tags.result[0].id!) || 0

    await api.coupons.createCoupon({
      couponDto: {
        ...coupon,
        startDate: coupon.startDate && coupon.startDate.toDate(),
        endDate: coupon.endDate && coupon.endDate.toDate(),
        expireDate: coupon.expireDate && coupon.expireDate.toDate(),
        drawDate: coupon.drawDate && coupon.drawDate.toDate(),
        smallPictureId: coupon.smallPictureId,
        bigPictureId: coupon.type === CouponType.Banner ? undefined : coupon.bigPictureId,
        prizeRulesFileId: coupon.type === CouponType.Prize ? coupon.prizeRulesFileId : undefined,
        couponCount: coupon.couponCount,
        tags: [tagId]
      }
    })

    dispatch(createCouponSuccess())
    history.push('/campaigns')
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const updateCoupon = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const tags = await api.tags.getTags({})
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tagId = (tags && tags.result && tags.result[0].id!) || 0

    await api.coupons.updateCoupon({
      id: coupon.id!,
      couponDto: {
        ...coupon,
        startDate: coupon.startDate && coupon.startDate.toDate(),
        endDate: coupon.endDate && coupon.endDate.toDate(),
        expireDate: coupon.expireDate && coupon.expireDate.toDate(),
        drawDate: coupon.drawDate && coupon.drawDate.toDate(),
        // TODO: integrate
        smallPictureId: coupon.smallPictureId,
        bigPictureId: coupon.type === CouponType.Banner ? undefined : coupon.bigPictureId,
        prizeRulesFileId: coupon.type === CouponType.Prize ? coupon.prizeRulesFileId : undefined,
        couponCount: coupon.couponCount,
        tags: [tagId]
      }
    })

    dispatch(updateCouponSuccess())
    history.push('/campaigns')
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const getCouponComments = (couponId: number): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const comments = await api.couponComments.getCouponComments({ couponId })

    dispatch(
      getCouponCommentsSuccess(
        comments.map(x => {
          return { ...x, dateTime: moment(x.dateTime) }
        })
      )
    )
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const deleteCouponComment = (couponId: number, commentId: number): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await api.couponComments.deleteCouponComment({
      commentId,
      couponId
    })

    dispatch(deleteCouponCommentsSuccess())
    dispatch(getCouponComments(couponId))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const activateCoupon = (id: number, isActive: boolean): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    await api.coupons.activateCoupon({
      id,
      activateCouponDto: { isActive }
    })

    dispatch(activateCouponSuccess())
    dispatch(getCoupon(id))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const updateCouponStatus = (
  id: number,
  couponState: CouponState,
  comment: string
): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    if (couponState) {
      await api.coupons.updateCouponStatus({
        id: id,
        changeCouponStateDto: {
          comment,
          state: couponState
        }
      })
    } else {
      await api.couponComments.addCouponComment({
        couponId: id,
        couponCommentDto: { comment: comment }
      })
    }

    dispatch(updateCouponStatusSuccess())
    dispatch(getCoupon(id))
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const getCategories = (): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const categories = await api.categories.getCategories({ pageSize: -1, orderBy: 'name' })
    dispatch(
      getCategoriesSuccess(categories.result!.map(x => ({ id: x.id, name: x.name } as Category)))
    )
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const getMajorPartners = (): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const partners = await api.partner.getPartners({
      pageSize: -1,
      orderBy: 'name',
      majorPartner: true
    })
    dispatch(
      getMajorPartnersSuccess(
        partners.result
          ? partners.result.map(
              x => ({ id: x.id, name: x.name, partnerState: x.partnerState } as Partner)
            )
          : []
      )
    )
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const downloadCoupons = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    // TODO fix names
    const blob: Blob = await api.coupons.getCouponCodes({ couponId: coupon.id! })
    saveAs(blob, `${coupon.id} - ${coupon.name} CouponCodes.csv`)
    dispatch(downloadCouponsSuccess())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const downloadClaimedCoupons = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    // TODO fix names
    const blob: Blob = await api.coupons.getCouponRedeemedCodes({ couponId: coupon.id! })
    saveAs(blob, `${coupon.id} - ${coupon.name} ClaimedCouponCodes.csv`)
    dispatch(downloadClaimedCouponsSuccess())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const downloadPrizeFile = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const fileName: string = await api.files.getFileName({ id: coupon.prizeRulesFileId! })
    const blob: Blob = await api.files.downloadFile({ id: coupon.prizeRulesFileId! })
    saveAs(blob, fileName)
    dispatch(downloadPrizeFileSuccess())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

const downloadPredefinedCodesFile = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setFeatureState(FeatureState.Loading))

  try {
    const fileName: string = await api.files.getFileName({ id: coupon.predefinedCodesFileId! })
    const blob: Blob = await api.files.downloadFile({ id: coupon.predefinedCodesFileId! })
    saveAs(blob, fileName)
    dispatch(downloadPredefinedCouponsFileSuccess())
  } catch (err) {
    dispatch(setFeatureState(FeatureState.Error))
  }
}

export const campaignActions = {
  resetCampaigns,
  setEditing,
  setSelectedCouponType,
  setSelectedCouponMode,
  setSelectedCouponDiscountType,
  setStateForCreate,
  setCoupon,
  getCoupon,
  createCoupon,
  updateCoupon,
  getCouponComments,
  deleteCouponComment,
  activateCoupon,
  updateCouponStatus,
  getCategories,
  getMajorPartners,
  downloadCoupons,
  downloadClaimedCoupons,
  downloadPrizeFile,
  downloadPredefinedCodesFile
}

export const campaignsReducer = campaignsSlice.reducer