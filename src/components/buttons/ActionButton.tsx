import { Tooltip, Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import { TooltipProps } from 'antd/lib/tooltip'
import React, { FC } from 'react'
import './ActionButtons.scss'

const tooltipConfig: Partial<TooltipProps> = {
  mouseEnterDelay: 0.5,
  placement: 'topRight',
  style: { marginLeft: '0.5rem' }
}

interface ActionButtonProps extends ButtonProps {
  tooltip: string
}

export const ActionButton: FC<ActionButtonProps> = props => {
  const { tooltip, icon, ...rest } = props
  return (
    <Tooltip {...tooltipConfig} title={tooltip}>
      <Button className="action-button" {...rest}>
        {icon}
      </Button>
    </Tooltip>
  )
}
