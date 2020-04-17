import React, { useEffect } from 'react'
import { CouponEditorFormProps, CouponEditorForm } from '../components/CouponEditorForm'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { Coupon } from 'models/coupon'
import { FeatureState } from 'models/featureState'
import { couponActions } from '../couponsSlice'

export const CouponEditorPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { coupon, featureState } = useSelector((state: RootState) => state.coupons)
  const loading = featureState === FeatureState.Loading

  useEffect(() => {
    id && dispatch(couponActions.getCoupon(+id))
  }, [id, dispatch])

  const handleCouponSave = (coupon: Coupon): void => {
    id && dispatch(couponActions.updateCoupon({ ...coupon, id: +id }))
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
