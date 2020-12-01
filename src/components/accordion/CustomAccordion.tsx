import { DownOutlined } from '@ant-design/icons'
import { Button, Collapse, Typography } from 'antd'
import { CollapseProps } from 'antd/lib/collapse'
import React, { FC, useState } from 'react'
import './CustomAccordion.scss'

const { Panel } = Collapse
const { Text } = Typography

export interface CustomAccordionProps extends CollapseProps {
  accordionKey: string
  title: string
  defaultActive?: boolean
  info?: JSX.Element
  actionBtnLabel?: JSX.Element | string
  onActionBtnClick?: Function
  isDraggable?: boolean
  children?: React.ReactNode
  isInactive?: boolean
}

export const CustomAccordion: FC<CustomAccordionProps> = ({
  accordionKey,
  defaultActive = true,
  title,
  info,
  actionBtnLabel,
  onActionBtnClick,
  children,
  isInactive,
  isDraggable = false, // for later functionality
  className,
  ...rest
}) => {
  const [isActivePanel, setIsActivePanel] = useState(defaultActive)

  return (
    <Collapse
      defaultActiveKey={defaultActive ? [accordionKey] : []}
      expandIcon={() => undefined}
      onChange={activeKeys => {
        if (!isInactive) {
          setIsActivePanel(activeKeys.includes(accordionKey))
        }
      }}
      className={`${className} ${isInactive ? 'panel--inactive' : ''}`}
      bordered={!isInactive}
      {...rest}
    >
      <Panel
        key={accordionKey}
        header={
          <span className="panel-header__container">
            <span className="panel-header-title__container">
              <span className="panel-header__title">
                <Text strong>{title}</Text>
                {!isInactive && <DownOutlined rotate={isActivePanel ? 180 : 0} />}
              </span>

              {info && <>{info}</>}
            </span>
            {actionBtnLabel && isActivePanel && (
              <Button
                onClick={e => {
                  e.stopPropagation()
                  onActionBtnClick?.()
                }}
              >
                {actionBtnLabel}
              </Button>
            )}
          </span>
        }
      >
        {children}
      </Panel>
    </Collapse>
  )
}
