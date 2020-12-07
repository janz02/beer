import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'
import { campaignSettingsActions, getCampaignSettingsElements } from './CampaignSettingsSlice'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormEelements'

interface CampaignSettingsUtils {
  form: FormInstance<any>
  handleSubmitButtonClick: (values: any) => void
  campaignSettingsFormElements: CampaignSettingsFormElements
}

export const useCampaignSettingsUtils = (): CampaignSettingsUtils => {
  const dispatch = useDispatch()
  const { form } = useFormUtils()
  const { campaignSettingsFormElements } = useSelector((state: RootState) => state.campaignSettings)

  const handleSubmitButtonClick = useCallback(
    (values: any): void => {
      dispatch(campaignSettingsActions.saveSettings(values))
    },
    [dispatch]
  )

  const handleGetSettingFormElements = useCallback((): void => {
    dispatch(getCampaignSettingsElements())
  }, [dispatch])

  useEffect(() => {
    handleGetSettingFormElements()
  }, [handleGetSettingFormElements])

  return {
    form,
    campaignSettingsFormElements,
    handleSubmitButtonClick
  }
}
