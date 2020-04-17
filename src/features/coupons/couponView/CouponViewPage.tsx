import React, { useEffect } from 'react'
import { CouponEditorFormProps, CouponEditorForm } from '../components/CouponEditorForm'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { couponActions } from '../couponsSlice'

export const CouponViewPage: React.FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { coupon, featureState } = useSelector((state: RootState) => state.coupons)
  const loading = featureState === FeatureState.Loading

  useEffect(() => {
    id && dispatch(couponActions.getCoupon(+id))
  }, [id, dispatch])

  const props: CouponEditorFormProps = {
    loading,
    couponIsNew: false,
    coupon,
    editing: false
  }

  return (
    <>
      <CouponEditorForm {...props} />
    </>
  )
}
