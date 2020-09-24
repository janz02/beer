import React, { FC, useMemo } from 'react'
import Badge, { BadgeProps } from 'antd/lib/badge'
import { useIsLargeScreen } from 'hooks'

interface TabPanelTitleProps {
  title: string
  icon?: React.ReactNode
  badgeProps?: BadgeProps
}

export const TabPanelTitle: FC<TabPanelTitleProps> = ({ title, icon, badgeProps }) => {
  const isMediumScreen = useIsLargeScreen()

  const hasToDisplayTitle = useMemo(() => !isMediumScreen || !icon, [isMediumScreen, icon])

  const panelTitle = useMemo(
    () => (
      <span className="tab-panel-title">
        {icon}
        {hasToDisplayTitle && title}
      </span>
    ),
    [hasToDisplayTitle, icon, title]
  )

  return badgeProps ? <Badge {...badgeProps}>{panelTitle}</Badge> : panelTitle
}
