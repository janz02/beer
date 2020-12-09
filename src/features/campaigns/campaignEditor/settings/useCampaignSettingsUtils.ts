import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'
import { campaignSettingsActions, getCampaignSettingsElements } from './campaignEditorSlice'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormEelements'

interface CampaignSettingsUtils {
  form: FormInstance<any>
  handleSubmitButtonClick: (values: any) => void
  campaignSettingsFormElements: CampaignSettingsFormElements
}

export const useCampaignSettingsUtils = (): CampaignSettingsUtils => {
  const dispatch = useDispatch()
  const { form } = useFormUtils()
  const { campaignSettingsFormElements } = useSelector((state: RootState) => state.campaignEditor)

  const handleSubmitButtonClick = useCallback(
    (formValues: any): void => {
      const values = {
        ...formValues,
        timing: {
          ...formValues.timing,
          endDate: formValues.timing.rangePicker
            ? formValues.timing.rangePicker[1]
            : formValues.timing.endDate,
          startDate: formValues.timing.rangePicker
            ? formValues.timing.rangePicker[0]
            : formValues.timing.startDate,
          startTime: formValues.timing.timeRange && formValues.timing.timeRange[0],
          endTime: formValues.timing.timeRange && formValues.timing.timeRange[1]
        },
        emailChannelSettings: {
          ...formValues.emailChannelSettings
        }
      }
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
