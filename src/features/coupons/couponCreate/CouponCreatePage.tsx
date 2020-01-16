import React from 'react'
import CouponEditorForm from 'features/coupons/components/CouponEditorForm'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { createCoupons } from './couponCreateSlice'
import { Coupon } from 'models/coupon'

const CouponCreatePage: React.FC = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.couponCreate)

  const handleCouponSave = (coupon: Coupon): void => {
    dispatch(createCoupons(coupon))
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

export default CouponCreatePage
