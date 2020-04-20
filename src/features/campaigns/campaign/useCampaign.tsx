import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FeatureState } from 'models/featureState'
import { RootState } from 'app/rootReducer'
import { Coupon } from 'models/coupon'
import { campaignActions } from '../campaignsSlice'
import { useParams } from 'react-router-dom'
import { toValidId } from 'services/paramsHelpers'

interface UseCampaignFeatures {
  loading: boolean
  id?: number
  couponIsNew: boolean
  coupon?: Coupon
  handleCouponSave: (values: any) => void
  getCoupon: () => void
}

export const useCampaign = (): UseCampaignFeatures => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { id } = useParams()
  const { coupon, featureState } = useSelector((state: RootState) => state.campaigns)

  const loading = featureState === FeatureState.Loading
  const validId = toValidId(id)
  const couponIsNew = !id

  const handleCouponSave = (values: any): void => {
    if (validId) {
      dispatch(campaignActions.updateCoupon({ ...values, id: validId }))
    } else {
      dispatch(campaignActions.createCoupon(values))
    }
  }

  const getCoupon = (): void => {
    validId && dispatch(campaignActions.getCoupon(validId))
  }

  return {
    loading,
    id: validId,
    couponIsNew,
    coupon,
    handleCouponSave,
    getCoupon
  }
}
