import { useDispatch, useSelector } from 'react-redux'
import { FeatureState } from 'models/featureState'
import { RootState } from 'app/rootReducer'
import { Coupon } from 'models/coupon'
import { campaignActions } from '../campaignsSlice'
import { useParams } from 'react-router-dom'
import { toValidId } from 'services/paramsHelpers'
import {
  CouponType,
  CouponRank,
  CouponState,
  CouponMode,
  CouponDiscountType
} from 'api/swagger/models'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormProps, FormInstance } from 'antd/lib/form'
import { CouponComment } from 'models/couponComment'
import { Category } from 'models/category'
import { Partner } from 'models/partner'
import { UserData } from 'models/user'
import { useCallback } from 'react'

interface UseCampaignFeatures {
  loading: boolean
  id?: number
  couponIsNew: boolean
  editing?: boolean
  coupon?: Coupon
  selectedCouponType?: CouponType
  selectedCouponMode?: CouponMode
  selectedCouponDiscountType?: CouponDiscountType
  categories?: Category[]
  majorPartners?: Partner[]
  userData: UserData
  displayEditor?: boolean
  rowGutter: number
  prizeOrDiscount: boolean
  form: FormInstance
  formProps: FormProps
  submitable: boolean
  modified: boolean
  commentFormProps: FormProps
  submitableComment: boolean
  prepareCommentFormFields: () => void
  handleCouponSave: (values: any) => void
  handleCouponActivate: () => void
  handleCouponChange: () => void
  handleDeleteCouponCommment: (coupon?: Coupon, couponComment?: CouponComment) => void
  getCoupon: () => void
  setEditing: typeof campaignActions.setEditing
  setSelectedCouponType: typeof campaignActions.setSelectedCouponType
  setSelectedCouponMode: typeof campaignActions.setSelectedCouponMode
  setSelectedCouponDiscountType: typeof campaignActions.setSelectedCouponDiscountType
  setStateForCreate: typeof campaignActions.setStateForCreate
  getCategories: typeof campaignActions.getCategories
  getMajorPartners: typeof campaignActions.getMajorPartners
}

export const useCampaign = (): UseCampaignFeatures => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const {
    coupon,
    categories,
    majorPartners,
    editing,
    featureState,
    selectedCouponType,
    selectedCouponMode,
    selectedCouponDiscountType,
    stateForCreate
  } = useSelector((state: RootState) => state.campaigns)
  const { userData } = useSelector((state: RootState) => state.auth)

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
  } = useFormUtils<Coupon>()

  const {
    form: commentForm,
    submitable: submitableComment,
    checkFieldsChange: checkFieldsChangeComment,
    resetFormFlags: resetFormFlagsComment,
    setFieldsValue: setFieldsValueComment
  } = useFormUtils()

  const loading = featureState === FeatureState.Loading
  const validId = toValidId(id)
  const couponIsNew = !id
  const rowGutter = 70
  const prizeOrDiscount =
    selectedCouponType === CouponType.Discount || selectedCouponType === CouponType.Prize
  const displayEditor =
    couponIsNew ||
    (editing &&
      coupon &&
      (coupon.state === CouponState.Created || coupon.state === CouponState.Waiting))

  const handleCouponSave = (values: any): void => {
    if (validId) {
      dispatch(campaignActions.updateCoupon({ ...values, id: validId }))
    } else {
      dispatch(campaignActions.createCoupon(values))
    }
  }

  const handleSubmit = (values: any): void => {
    values.state = stateForCreate
    handleCouponSave &&
      handleCouponSave({
        ...values,
        categoryId: +values.categoryId,
        discountValue: +values.discountValue,
        minimumShoppingValue: +values.minimumShoppingValue,
        itemPrice: +values.itemPrice,
        previousYearAverageBasketValue: +values.previousYearAverageBasketValue,
        partnerId: +values.partnerId,
        couponCount: +values.couponCount,
        prizeValue: +values.prizeValue
      })
    resetFormFlags()
  }

  const formProps: FormProps = {
    onFinish: handleSubmit,
    onFieldsChange: () => {
      checkFieldsChange()
    }
  }

  const handleCouponChange = useCallback(() => {
    campaignActions.setSelectedCouponType(coupon?.type)
    campaignActions.setSelectedCouponMode(coupon?.mode)
    campaignActions.setSelectedCouponDiscountType(coupon?.discountType)

    setFieldsValue({
      ...coupon,
      rank: CouponRank.Basic
    })
  }, [setFieldsValue, coupon])

  const handleCouponActivate = (): void => {
    coupon?.id && dispatch(campaignActions.activateCoupon(coupon?.id, !coupon?.isActive))
  }

  const getCoupon = useCallback(() => {
    validId && dispatch(campaignActions.getCoupon(validId))

    return () => {
      dispatch(campaignActions.setCoupon(undefined))
    }
  }, [dispatch, validId])

  const handleDeleteCouponCommment = (coupon?: Coupon, couponComment?: CouponComment): void => {
    coupon?.id &&
      couponComment?.id &&
      campaignActions.deleteCouponComment(coupon.id, couponComment.id)
  }

  const handleCommentSubmit = (values: any): void => {
    coupon?.id &&
      dispatch(campaignActions.updateCouponStatus(coupon.id, values.couponState, values.comment))
    resetFormFlagsComment()
  }

  const commentFormProps: FormProps = {
    form: commentForm,
    onFinish: handleCommentSubmit,
    onFieldsChange: () => {
      checkFieldsChangeComment()
    }
  }

  const prepareCommentFormFields = useCallback(() => {
    if (!displayEditor) {
      setFieldsValueComment({
        couponState: '',
        comment: ''
      })
    }
  }, [setFieldsValueComment, displayEditor])

  return {
    loading,
    id: validId,
    couponIsNew,
    editing,
    coupon,
    selectedCouponType,
    selectedCouponMode,
    selectedCouponDiscountType,
    categories,
    majorPartners,
    userData,
    displayEditor,
    rowGutter,
    prizeOrDiscount,
    form,
    formProps,
    submitable,
    modified,
    commentFormProps,
    submitableComment,
    prepareCommentFormFields,
    handleCouponSave,
    handleCouponActivate,
    handleCouponChange,
    handleDeleteCouponCommment,
    getCoupon,
    setEditing: campaignActions.setEditing,
    setSelectedCouponType: campaignActions.setSelectedCouponType,
    setSelectedCouponMode: campaignActions.setSelectedCouponMode,
    setSelectedCouponDiscountType: campaignActions.setSelectedCouponDiscountType,
    setStateForCreate: campaignActions.setStateForCreate,
    getCategories: campaignActions.getCategories,
    getMajorPartners: campaignActions.getMajorPartners
  }
}
