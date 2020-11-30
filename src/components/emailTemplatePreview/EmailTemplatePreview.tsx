import React from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceSelectorButton, DeviceType } from './DeviceSelectorButton'
import { useEmailTemplatePreviewUtils } from './useEmailTemplatePreviewUtils'
import './EmailTemplatePreview.scss'

export const EmailTemplatePreview: React.FC = () => {
  const { t } = useTranslation()
  const { handleDeviceSelection, selectedDevice, loading } = useEmailTemplatePreviewUtils('500px')

  return (
    <div className="email-preview-container">
      <div>
        <span className="device-selector-title">{t('email-template.device-type.title')}</span>
        <div className="device-selector">
          <DeviceSelectorButton
            type={DeviceType.Desktop}
            onSelect={() => {
              handleDeviceSelection(DeviceType.Desktop)
            }}
            selected={selectedDevice}
          />
          <DeviceSelectorButton
            type={DeviceType.Tablet}
            onSelect={() => {
              handleDeviceSelection(DeviceType.Tablet)
            }}
            selected={selectedDevice}
          />
          <DeviceSelectorButton
            type={DeviceType.Mobile}
            onSelect={() => {
              handleDeviceSelection(DeviceType.Mobile)
            }}
            selected={selectedDevice}
          />
        </div>
      </div>
      <div id="email-preview" hidden={loading} />
      <div hidden={!loading}>{t('common.loading')}</div>
    </div>
  )
}
