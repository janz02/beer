import { DownOutlined } from '@ant-design/icons'
import { Button, Collapse } from 'antd'
import CollapsePanel from 'antd/lib/collapse/CollapsePanel'
import Text from 'antd/lib/typography/Text'
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
      <CollapsePanel
        key={accordionKey}
        header={
          <span className="panel-header__container">
            <span className="panel-header-title__container">
              <span className="panel-header__title">
                <Text strong>{title}</Text>
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
      </CollapsePanel>
    </Collapse>
  )
}
