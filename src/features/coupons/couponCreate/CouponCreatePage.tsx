import React from 'react'
import {
  CouponEditorForm,
  CouponEditorFormProps
} from 'features/coupons/components/CouponEditorForm'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { Coupon } from 'models/coupon'
import { FeatureState } from 'models/featureState'
import { couponActions } from '../couponsSlice'

export const CouponCreatePage: React.FC = () => {
  const dispatch = useDispatch()
  const { featureState } = useSelector((state: RootState) => state.coupons)
  const loading = featureState === FeatureState.Loading

  const handleCouponSave = (coupon: Coupon): void => {
    dispatch(couponActions.createCoupon(coupon))
  }

  const props: CouponEditorFormProps = {
    handleCouponSave,
    loading,
    couponIsNew: true,
    editing: true
  }

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  )
}
