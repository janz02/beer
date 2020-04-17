import React, { FC } from 'react'
import {
  CampaignEditorForm,
  CampaignEditorFormProps
} from 'features/campaigns/campaign/CampaignEditorForm'
import { RootState } from 'app/rootReducer'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { Coupon } from 'models/coupon'
import { FeatureState } from 'models/featureState'
import { campaignActions } from '../campaignsSlice'

export const CampaignCreatePage: FC = () => {
  const dispatch = useDispatch()
  const { featureState } = useSelector((state: RootState) => state.campaigns)
  const loading = featureState === FeatureState.Loading

  const handleCouponSave = (coupon: Coupon): void => {
    dispatch(campaignActions.createCoupon(coupon))
  }

  const props: CampaignEditorFormProps = {
    handleCouponSave,
    loading,
    couponIsNew: true,
    editing: true
  }

  return (
    <>
      <CampaignEditorForm {...props} />
    </>
  )
}
