import { useDispatch, useSelector } from 'react-redux'
import { FeatureState } from 'models/featureState'
import { RootState } from 'app/rootReducer'
import { CouponCampaign } from 'models/couponCampaign'
import { couponCampaignActions } from '../couponCampaignsSlice'
import { useParams } from 'react-router-dom'
import { toValidId } from 'services/paramsHelpers'
import {
  CouponType,
  CouponRank,
  CouponState,
  CouponMode,
  CouponDiscountType
} from 'api/swagger/coupon'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormProps, FormInstance } from 'antd/lib/form'
import { CouponCampaignComment } from 'models/couponCampaignComment'
import { CouponCampaignCategory } from 'models/couponCampaignCategory'
import { Partner } from 'models/partner'
import { UserData } from 'models/user'
import { useCallback } from 'react'

export interface CouponCampaignUtils {
  loading: boolean
  id?: number
  couponIsNew: boolean
  editing?: boolean
  coupon?: CouponCampaign
  selectedCouponType?: CouponType
  selectedCouponMode?: CouponMode
  selectedCouponDiscountType?: CouponDiscountType
  categories?: CouponCampaignCategory[]
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
  handleDeleteCouponCommment: (
    coupon?: CouponCampaign,
    couponComment?: CouponCampaignComment
  ) => void
  getCoupon: () => void
  setEditing: typeof couponCampaignActions.setEditing
  setSelectedCouponType: typeof couponCampaignActions.setSelectedCouponType
  setSelectedCouponMode: typeof couponCampaignActions.setSelectedCouponMode
  setSelectedCouponDiscountType: typeof couponCampaignActions.setSelectedCouponDiscountType
  setStateForCreate: typeof couponCampaignActions.setStateForCreate
  getCategories: typeof couponCampaignActions.getCategories
  getMajorPartners: typeof couponCampaignActions.getMajorPartners
}

export const useCouponCampaignUtils = (): CouponCampaignUtils => {
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
  } = useSelector((state: RootState) => state.couponCampaigns)
  const { userData } = useSelector((state: RootState) => state.auth)

  const {
    form,
    submitable,
    modified,
    checkFieldsChange,
    resetFormFlags,
    setFieldsValue
  } = useFormUtils<CouponCampaign>()

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
      dispatch(couponCampaignActions.updateCoupon({ ...values, id: validId }))
    } else {
      dispatch(couponCampaignActions.createCoupon(values))
    }
  }

  const handleSubmit = (values: any): void => {
    values.state = stateForCreate
    handleCouponSave &&
      handleCouponSave({
        ...values,
        smallPictureId: values.smallPicture.id,
        bigPictureId: values.bigPicture.id,
        prizeRulesFileId: values.prizeRulesFile ? values.prizeRulesFile.id : null,
        predefinedCodesFileId: values.predefinedCodesFile ? values.predefinedCodesFile.id : null,
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
    dispatch(couponCampaignActions.setSelectedCouponType(coupon?.type))
    dispatch(couponCampaignActions.setSelectedCouponMode(coupon?.mode))
    dispatch(couponCampaignActions.setSelectedCouponDiscountType(coupon?.discountType))

    setFieldsValue({
      ...coupon,
      rank: CouponRank.Basic
    })
  }, [setFieldsValue, coupon, dispatch])

  const handleCouponActivate = (): void => {
    coupon?.id && dispatch(couponCampaignActions.activateCoupon(coupon?.id, !coupon?.isActive))
  }

  const getCoupon = useCallback(() => {
    validId && dispatch(couponCampaignActions.getCoupon(validId))

    return () => {
      dispatch(couponCampaignActions.setCoupon(undefined))
    }
  }, [dispatch, validId])

  const handleDeleteCouponCommment = (
    coupon?: CouponCampaign,
    couponComment?: CouponCampaignComment
  ): void => {
    coupon?.id &&
      couponComment?.id &&
      dispatch(couponCampaignActions.deleteCouponComment(coupon.id, couponComment.id))
  }

  const handleCommentSubmit = (values: any): void => {
    coupon?.id &&
      dispatch(
        couponCampaignActions.updateCouponStatus(coupon.id, values.couponState, values.comment)
      )
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
    setEditing: couponCampaignActions.setEditing,
    setSelectedCouponType: couponCampaignActions.setSelectedCouponType,
    setSelectedCouponMode: couponCampaignActions.setSelectedCouponMode,
    setSelectedCouponDiscountType: couponCampaignActions.setSelectedCouponDiscountType,
    setStateForCreate: couponCampaignActions.setStateForCreate,
    getCategories: couponCampaignActions.getCategories,
    getMajorPartners: couponCampaignActions.getMajorPartners
  }
}
