import React, { useEffect, FC } from 'react'
import { CampaignEditorFormProps, CampaignEditorForm } from './CampaignEditorForm'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { Coupon } from 'models/coupon'
import { FeatureState } from 'models/featureState'
import { campaignActions } from '../campaignsSlice'

export const CampaignEditorPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { coupon, featureState } = useSelector((state: RootState) => state.campaigns)
  const loading = featureState === FeatureState.Loading

  useEffect(() => {
    id && dispatch(campaignActions.getCoupon(+id))
  }, [id, dispatch])

  const handleCouponSave = (coupon: Coupon): void => {
    id && dispatch(campaignActions.updateCoupon({ ...coupon, id: +id }))
  }

  const props: CampaignEditorFormProps = {
    handleCouponSave,
    loading,
    couponIsNew: false,
    coupon,
    editing: true
  }

  return (
    <>
      <CampaignEditorForm {...props} />
    </>
  )
}
