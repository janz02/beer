import React from 'react'
import { useTranslation } from 'react-i18next'
import { DeviceSelectorButton, DeviceType } from './DeviceSelectorButton'
import { useEmailTemplatePreviewUtils } from './useEmailTemplatePreviewUtils'
import styles from './EmailTemplatePreview.module.scss'

interface EmailTemplatePreviewProps {
  previewHeightPx: number
}

export const EmailTemplatePreview: React.FC<EmailTemplatePreviewProps> = ({ previewHeightPx }) => {
  const { t } = useTranslation()
  const { handleDeviceSelection, selectedDevice, loading } = useEmailTemplatePreviewUtils(
    `${previewHeightPx}px`
  )

  return (
    <>
      <div>
        <span className={styles.deviceSelectorTitle}>{t('email-template.device-type.title')}</span>
        <div className={styles.deviceSelector}>
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
      <div id="email-preview" className={styles.emailPreview} hidden={loading} />
      <div hidden={!loading}>{t('common.loading')}</div>
    </>
  )
}
