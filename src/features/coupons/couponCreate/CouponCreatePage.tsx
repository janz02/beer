import React from 'react'
import { CouponEditorForm } from 'features/coupons/components/CouponEditorForm'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { createCoupon } from './couponCreateSlice'
import { Coupon } from 'models/coupon'

export const CouponCreatePage: React.FC = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.couponCreate)

  const handleCouponSave = (coupon: Coupon): void => {
    dispatch(createCoupon(coupon))
  }

  const props = {
    handleCouponSave,
    loading,
    couponIsNew: true
  }

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  )
}
