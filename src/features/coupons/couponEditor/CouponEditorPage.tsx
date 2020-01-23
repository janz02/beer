import React, { useEffect } from 'react'
import { CouponEditorFormProps, CouponEditorForm } from '../components/CouponEditorForm'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { getCoupons, updateCoupon } from './couponEditorSlice'
import { Coupon } from 'models/coupon'

export const CouponEditorPage: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const { coupon, loading } = useSelector((state: RootState) => state.couponEditor)

  useEffect(() => {
    id && dispatch(getCoupons(+id))
  }, [id, dispatch])

  const handleCouponSave = (coupon: Coupon): void => {
    id && dispatch(updateCoupon({ ...coupon, id: +id }))
  }

  const props: CouponEditorFormProps = {
    handleCouponSave,
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
