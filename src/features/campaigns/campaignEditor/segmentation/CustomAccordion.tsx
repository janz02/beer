import { DownOutlined, InfoCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Collapse, Modal, Typography } from 'antd'
import React, { FC, useState } from 'react'
import './CustomAccordion.scss'

const { Panel } = Collapse
const { Text } = Typography

export interface CustomAccordionProps {
  key: string
  defaultActive: boolean
  title: string
  infoLabel: string
  infoData: string
  onInfoClick: Function
  actionBtnLabel: JSX.Element | string
  onActionBtnClick: Function
  isDraggable: boolean
  children: Node
}

export const CustomAccordion: FC<CustomAccordionProps> = ({
  key,
  defaultActive = true,
  title,
  infoLabel,
  infoData,
  onInfoClick,
  actionBtnLabel,
  onActionBtnClick,
  isDraggable = false, // for later functionality
  children
}) => {
  const [isActive, setIsActive] = useState(true)

  return (
    <Collapse
      defaultActiveKey={defaultActive ? [key] : []}
      expandIcon={() => undefined}
      onChange={activeKeys => setIsActive(activeKeys.includes(key))}
    >
      <Panel
        key={key}
        header={
          <span className="panel-header__container">
            <span className="panel-header-title__container">
              <span className="panel-header__title">
                <Text strong>{title}</Text>
                <DownOutlined rotate={isActive ? 180 : 0} />
              </span>

              {infoLabel && (
                <span
                  className="panel-header__info"
                  onClick={e => {
                    e.stopPropagation()
                    onInfoClick()
                  }}
                >
                  <Text>{infoLabel}</Text>
                  <span>
                    <Text strong>{infoData}</Text>
                    <InfoCircleOutlined />
                  </span>
                </span>
              )}
            </span>
            {actionBtnLabel && (
              <Button
                onClick={e => {
                  e.stopPropagation()
                  onActionBtnClick()
                }}
              >
                {/* <PlusOutlined /> Add segementation */}
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
