import React from 'react';
import {
  CouponEditorForm,
  CouponEditorFormProps
import { useSelector, useDispatch } from 'hooks/react-redux-hooks';
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'react-redux'
import { getCoupons, updateCoupon } from './couponEditorSlice'
import { Coupon, CouponState } from 'models/coupon'

export const CouponEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { coupon, loading } = useSelector((state: RootState) => state.couponEditor)

  React.useEffect(() => {
    id && dispatch(getCoupons(+id))
  }, [id, dispatch])

  const handleCouponSave = (coupon: Coupon): void => {
    id && dispatch(updateCoupon({ ...coupon, id: +id }))
  }

  const handleCouponStateAction = (
    couponId: number,
    couponState: CouponState,
    comment: string
  ): void => {
    // TODO: integrate.
    console.log(`${couponState} action triggered.`)
  }

  const props: CouponEditorFormProps = {
    handleCouponSave,
    handleCouponStateAction,
    loading,
    couponIsNew: false,
    coupon
  }

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  )
}
