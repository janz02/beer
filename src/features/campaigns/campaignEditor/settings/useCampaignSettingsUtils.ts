import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'
import { campaignEditorActions, getCampaignSettingsElements } from '../campaignEditorSlice'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormElements'
import { Campaign } from 'models/campaign/campaign'

interface CampaignSettingsUtils {
  form: FormInstance<any>
  handleSubmitButtonClick: (values: any) => void
  campaignSettingsFormElements: CampaignSettingsFormElements
}

export const useCampaignSettingsUtils = (): CampaignSettingsUtils => {
  const dispatch = useDispatch()
  const { form, setFieldsValue } = useFormUtils<Campaign>()
  const { campaignSettingsFormElements, campaign } = useSelector(
    (state: RootState) => state.campaignEditor
  )

  const handleSubmitButtonClick = useCallback(
    (values: any): void => {
      dispatch(campaignEditorActions.saveSettings(values))
    },
    [dispatch]
  )

  const handleGetSettingFormElements = useCallback((): void => {
    dispatch(getCampaignSettingsElements())
  }, [dispatch])

  useEffect(() => {
    handleGetSettingFormElements()
    setFieldsValue({ ...campaign })
  }, [campaign, handleGetSettingFormElements, setFieldsValue])

  return {
    form,
    campaignSettingsFormElements,
    handleSubmitButtonClick
  }
}
