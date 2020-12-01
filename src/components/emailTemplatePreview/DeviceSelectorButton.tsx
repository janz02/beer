import { DesktopOutlined, MobileOutlined, TabletOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'
import './DeviceSelectorButton.scss'

export enum DeviceType {
  Tablet,
  Mobile,
  Desktop
}
interface DeviceSelectorButtonProps {
  type: DeviceType
  onSelect: () => void
  selected: DeviceType
}

export const DeviceSelectorButton: React.FC<DeviceSelectorButtonProps> = ({
  type,
  selected,
  onSelect
}) => {
  const { t } = useTranslation()

  let icon = <DesktopOutlined />
  let tooltip: string = t('email-template.device-type.mobile')

  switch (type) {
    case DeviceType.Mobile:
      tooltip = t('email-template.device-type.mobile')
      icon = <MobileOutlined size={32} />
      break
    case DeviceType.Tablet:
      tooltip = t('email-template.device-type.tablet')
      icon = <TabletOutlined size={32} />
      break
    case DeviceType.Desktop:
      tooltip = t('email-template.device-type.desktop')
      icon = <DesktopOutlined size={32} />
      break
    default:
      break
  }

  return (
    <Tooltip mouseEnterDelay={0.75} placement="bottomLeft" title={tooltip}>
      <div
        onClick={() => {
          onSelect()
        }}
        className={'deviceButton ' + (selected === type ? 'deviceSelected' : '')}
      >
        {icon}
      </div>
    </Tooltip>
  )
}
