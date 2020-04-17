import React, { useEffect, FC } from 'react'
import { CampaignEditorFormProps, CampaignEditorForm } from './CampaignEditorForm'
import { useSelector, useDispatch } from 'hooks/react-redux-hooks'
import { useParams } from 'react-router-dom'
import { RootState } from 'app/rootReducer'
import { FeatureState } from 'models/featureState'
import { campaignActions } from '../campaignsSlice'

export const CampaignViewPage: FC = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { coupon, featureState } = useSelector((state: RootState) => state.campaigns)
  const loading = featureState === FeatureState.Loading

  useEffect(() => {
    id && dispatch(campaignActions.getCoupon(+id))
  }, [id, dispatch])

  const props: CampaignEditorFormProps = {
    loading,
    couponIsNew: false,
    coupon,
    editing: false
  }

  return (
    <>
      <CampaignEditorForm {...props} />
    </>
  )
}
