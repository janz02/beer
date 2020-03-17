import React from 'react'
import {
  CouponEditorForm,
  CouponEditorFormProps
} from 'features/coupons/components/CouponEditorForm'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { Coupon } from 'models/coupon'
import { createCoupon } from '../couponsSlice'

export const CouponCreatePage: React.FC = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.coupons)

  const handleCouponSave = (coupon: Coupon): void => {
    dispatch(createCoupon(coupon))
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
