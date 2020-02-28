import React, { useEffect } from 'react'
import { CouponEditorFormProps, CouponEditorForm } from '../components/CouponEditorForm'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { getCoupon, updateCoupon } from './couponEditorSlice'
import { Coupon } from 'models/coupon'

export const CouponEditorPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { coupon, loading } = useSelector((state: RootState) => state.couponEditor)

  useEffect(() => {
    id && dispatch(getCoupon(+id))
  }, [id, dispatch])

  const handleCouponSave = (coupon: Coupon): void => {
    id && dispatch(updateCoupon({ ...coupon, id: +id }))
  }

  const props: CouponEditorFormProps = {
    handleCouponSave,
    loading,
    couponIsNew: false,
    coupon,
    editing: true
  }

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  )
}
