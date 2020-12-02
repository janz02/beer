import { DownOutlined } from '@ant-design/icons'
import { Button, Collapse, Typography } from 'antd'
import React, { FC, useState } from 'react'
import './CustomAccordion.scss'

export interface CustomAccordionProps {
  accordionKey: string
  title: string
  defaultActive?: boolean
  info?: JSX.Element
  actionBtnLabel?: JSX.Element | string
  onActionBtnClick?: Function
  isDraggable?: boolean
  children: React.ReactNode
}

export const CustomAccordion: FC<CustomAccordionProps> = ({
  accordionKey,
  defaultActive = true,
  title,
  info,
  actionBtnLabel,
  onActionBtnClick,
  children,
  isDraggable = false // for later functionality
}) => {
  const [isActive, setIsActive] = useState(defaultActive)

  return (
    <Collapse
      defaultActiveKey={defaultActive ? [accordionKey] : []}
      expandIcon={() => undefined}
      onChange={activeKeys => {
        console.log(activeKeys)
        setIsActive(activeKeys.includes(accordionKey))
      }}
    >
      <Collapse.Panel
        key={accordionKey}
        header={
          <span className="panel-header__container">
            <span className="panel-header-title__container">
              <span className="panel-header__title">
                <Typography.Text strong>{title}</Typography.Text>
                <DownOutlined rotate={isActive ? 180 : 0} />
              </span>

              {info && <>{info}</>}
            </span>
            {actionBtnLabel && isActive && (
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
      </Collapse.Panel>
    </Collapse>
  )
}
