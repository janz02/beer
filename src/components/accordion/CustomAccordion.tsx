import { DownOutlined } from '@ant-design/icons'
import { Button, Collapse, Typography } from 'antd'
import { CollapseProps } from 'antd/lib/collapse'
import React, { FC, useState } from 'react'
import styles from './CustomAccordion.module.scss'

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
      className={`${className} ${isInactive ? 'custom-panel--inactive' : ''}`}
      bordered={!isInactive}
      {...rest}
    >
      <Collapse.Panel
        key={accordionKey}
        header={
          <span
            className={`${styles.panelHeader__container} ${
              isDraggable ? styles.panelHeader__container__draggable : ''
            }`}
          >
            <span className={styles.panelHeaderTitle__container}>
              <span className={styles.panelHeader__title}>
                <Typography.Text strong>{title}</Typography.Text>
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
      </Collapse.Panel>
    </Collapse>
  )
}
