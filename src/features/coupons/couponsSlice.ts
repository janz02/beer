import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'app/store'
import { api } from 'api'
import { Category } from 'models/category'
import { Coupon } from 'models/coupon'
import moment from 'moment'
import { message } from 'antd'
import i18n from 'app/i18n'
import { history } from 'router/router'
import { CouponState, CouponType } from 'api/swagger/models'
import { CouponComment } from 'models/couponComment'
import { Partner } from 'models/partner'
import { saveAs } from 'file-saver'

interface CouponsState {
  coupon?: Coupon
  categories?: Category[]
  majorPartners?: Partner[]
  error: boolean
  loading: boolean
}

const initialState: CouponsState = {
  error: false,
  loading: false
}

const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {
    resetCoupons: () => initialState,
    getCouponSuccess(state, action: PayloadAction<Coupon>) {
      state.coupon = action.payload

      state.loading = false
      state.error = false
    },
    createCouponSuccess(state) {
      message.success(i18n.t('coupon-create.create-coupon-success'), 10)
      state.loading = false
      state.error = false
    },
    updateCouponSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-success'), 10)
      state.loading = false
      state.error = false
    },
    deleteCouponCommentsSuccess(state) {
      state.loading = false
      state.error = false
    },
    getCouponCommentsSuccess(state, action: PayloadAction<CouponComment[]>) {
      if (state.coupon) {
        state.coupon.comments = action.payload
      }
      state.loading = false
      state.error = false
    },
    activateCouponSuccess(state) {
      state.loading = false
      state.error = false
    },
    updateCouponStatusSuccess(state) {
      message.success(i18n.t('coupon-editor.save-coupon-status-success'), 10)
      state.loading = false
      state.error = false
    },
    getCategoriesSuccess(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload

      state.loading = false
      state.error = false
    },
    getMajorPartnersSuccess(state, action: PayloadAction<Partner[]>) {
      state.majorPartners = action.payload

      state.loading = false
      state.error = false
    },
    setLoadingStart(state) {
      state.loading = true
    },
    setLoadingFailed(state) {
      state.loading = false
      state.error = true
    },
    downloadCouponsSuccess(state) {
      state.loading = false
      state.error = false
    },
    downloadCouponsFailed(state) {
      state.loading = false
      state.error = true
    },
    downloadClaimedCouponsSuccess(state) {
      state.loading = false
      state.error = false
    },
    downloadClaimedCouponsFailed(state) {
      state.loading = false
      state.error = true
    },
    downloadPrizeFileSuccess(state) {
      state.loading = false
      state.error = false
    },
    downloadPrizeFileFailed(state) {
      state.loading = false
      state.error = true
    },
    downloadPredefinedCouponsFileSuccess(state) {
      state.loading = false
      state.error = false
    },
    downloadPredefinedCouponsFileFailed(state) {
      state.loading = false
      state.error = true
    }
  }
})

const {
  getCouponSuccess,
  createCouponSuccess,
  updateCouponSuccess,
  deleteCouponCommentsSuccess,
  getCouponCommentsSuccess,
  activateCouponSuccess,
  updateCouponStatusSuccess,
  getCategoriesSuccess,
  getMajorPartnersSuccess,
  setLoadingStart,
  setLoadingFailed,
  downloadCouponsSuccess,
  downloadCouponsFailed,
  downloadClaimedCouponsSuccess,
  downloadClaimedCouponsFailed,
  downloadPrizeFileSuccess,
  downloadPrizeFileFailed,
  downloadPredefinedCouponsFileSuccess,
  downloadPredefinedCouponsFileFailed
} = couponsSlice.actions

export const { resetCoupons } = couponsSlice.actions

export const couponsReducer = couponsSlice.reducer

export const getCoupon = (id: number): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

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
    dispatch(setLoadingFailed())
  }
}

export const createCoupon = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

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
    dispatch(setLoadingFailed())
  }
}

export const updateCoupon = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

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
    dispatch(setLoadingFailed())
  }
}

export const getCouponComments = (couponId: number): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

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
    dispatch(setLoadingFailed())
  }
}

export const deleteCouponComment = (
  couponId: number,
  commentId: number
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    await api.couponComments.deleteCouponComment({
      commentId,
      couponId
    })

    dispatch(deleteCouponCommentsSuccess())
    dispatch(getCouponComments(couponId))
  } catch (err) {
    dispatch(setLoadingFailed())
  }
}

export const activateCoupon = (id: number, isActive: boolean): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    await api.coupons.activateCoupon({
      id,
      activateCouponDto: { isActive }
    })

    dispatch(activateCouponSuccess())
    dispatch(getCoupon(id))
  } catch (err) {
    dispatch(setLoadingFailed())
  }
}

export const updateCouponStatus = (
  id: number,
  couponState: CouponState,
  comment: string
): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

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
    dispatch(setLoadingFailed())
  }
}

export const getCategories = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    // TODO: categories pageSize is hardcoded, consider to do a better form field with lazy loading and search
    const categories = await api.categories.getCategories({ pageSize: 10000, orderBy: 'name' })
    dispatch(
      getCategoriesSuccess(categories.result!.map(x => ({ id: x.id, name: x.name } as Category)))
    )
  } catch (err) {
    dispatch(setLoadingFailed())
  }
}

export const getMajorPartners = (): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    // TODO: partners pageSize is hardcoded, consider to do a better form field with lazy loading and search
    const partners = await api.partner.getPartners({
      pageSize: 10000,
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
    dispatch(setLoadingFailed())
  }
}

export const downloadCoupons = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    // TODO fix names
    const blob: Blob = await api.couponUserCodes.couponCodesCouponUserCode({ couponId: coupon.id! })
    saveAs(blob, `${coupon.id} - ${coupon.name} CouponCodes.csv`)
    dispatch(downloadCouponsSuccess())
  } catch (err) {
    dispatch(downloadCouponsFailed())
  }
}

export const downloadClaimedCoupons = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    // TODO fix names
    const blob: Blob = await api.couponUserCodes.couponUserCode({ couponId: coupon.id! })
    saveAs(blob, `${coupon.id} - ${coupon.name} ClaimedCouponCodes.csv`)
    dispatch(downloadClaimedCouponsSuccess())
  } catch (err) {
    dispatch(downloadClaimedCouponsFailed())
  }
}

export const downloadPrizeFile = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())

  try {
    const fileName: string = await api.files.getFileName({ id: coupon.prizeRulesFileId! })
    const blob: Blob = await api.files.downloadFile({ id: coupon.prizeRulesFileId! })
    saveAs(blob, fileName)
    dispatch(downloadPrizeFileSuccess())
  } catch (err) {
    dispatch(downloadPrizeFileFailed())
  }
}

export const downloadPredefinedCodesFile = (coupon: Coupon): AppThunk => async dispatch => {
  dispatch(setLoadingStart())
  try {
    const fileName: string = await api.files.getFileName({ id: coupon.predefinedCodesFileId! })
    const blob: Blob = await api.files.downloadFile({ id: coupon.predefinedCodesFileId! })
    saveAs(blob, fileName)
    dispatch(downloadPredefinedCouponsFileSuccess())
  } catch (err) {
    dispatch(downloadPredefinedCouponsFileFailed())
  }
}
