import React, { FC } from 'react'
import { Tabs } from 'antd'
import { TabsProps } from 'antd/lib/tabs'

import './ResponsiveTabs.scss'

type ResponsiveTabsProps = TabsProps

export const ResponsiveTabs: FC<ResponsiveTabsProps> = ({ className, children, ...tabProps }) => {
  return (
    <Tabs className={`responsive-tabs ${className}`} {...tabProps}>
      {children}
    </Tabs>
  )
}
