import { RootState } from 'app/rootReducer'
import { useDispatch, useSelector } from 'hooks/react-redux-hooks'
import { useCallback, useEffect } from 'react'
import { useFormUtils } from 'hooks/useFormUtils'
import { FormInstance } from 'antd/lib/form'
import { getCampaignSettingsElements } from '../campaignEditorSlice'
import { CampaignSettingsFormElements } from 'models/campaign/campaignSettingsFormElements'
import { saveSettings } from './../campaignEditorSlice'
import { CampaignSettingsUpdateDto } from 'models/campaign/campaignSettings'
import { CampaignEmailSettings } from 'models/campaign/campaign'
import moment from 'moment'

interface CampaignSettingsUtils {
  form: FormInstance<CampaignSettingsUpdateDto>
  handleSubmitButtonClick: (values: any) => void
  campaignSettingsFormElements: CampaignSettingsFormElements
  handleGetSettingFormElements: () => void
}

export const useCampaignSettingsUtils = (): CampaignSettingsUtils => {
  const dispatch = useDispatch()
  const { form, setFieldsValue } = useFormUtils<CampaignSettingsUpdateDto>()
  const { campaignSettingsFormElements, campaign } = useSelector(
    (state: RootState) => state.campaignEditor
  )

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
      dispatch(saveSettings(values))
    },
    [dispatch]
  )

  const handleGetSettingFormElements = useCallback((): void => {
    dispatch(getCampaignSettingsElements())
  }, [dispatch])

  useEffect(() => {
    if (campaign) {
      const emailSettings = (campaign?.channelSettings as CampaignEmailSettings)!
      const settingsUpdateDto: CampaignSettingsUpdateDto = {
        description: campaign?.comment!,
        name: campaign?.name!,
        emailChannelSettings: {
          emailMaxReSends: emailSettings.maxResends!,
          emailResendFrequencyId: emailSettings.resendFrequency?.value!,
          resendingRuleOptions: emailSettings.resendOrRecallRules?.flatMap(x => x.value)!
        },
        channelId: campaign?.settings?.channel?.value!,
        productId: campaign?.settings?.product?.value!,
        requestorId: campaign?.requester?.value!,
        responsibleId: campaign?.responsible?.value!,
        timing: {
          endDate: emailSettings.treatmentEndDate!,
          endTime: moment(emailSettings.treatmentEndTime)!,
          startDate: moment(emailSettings.treatmentStartDate)!,
          startTime: moment(emailSettings.treatmentStartTime)!,
          timingTypeId: emailSettings.timingTypeId!,
          intervalRestrictionOptions: emailSettings.resendOrRecallRules?.flatMap(x => x.value)!
        }
      }
      setFieldsValue(settingsUpdateDto)
    }
  }, [campaign, handleGetSettingFormElements, setFieldsValue])

  return {
    form,
    campaignSettingsFormElements,
    handleSubmitButtonClick,
    handleGetSettingFormElements
  }
}
