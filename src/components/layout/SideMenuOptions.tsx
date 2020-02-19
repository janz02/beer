import React, { FC, useMemo } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { DesktopOutlined, FileOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

interface SideMenuOptionProps {
  label: string
  link: string
  icon: JSX.Element
}

export interface SideMenuOptionsProps {
  onOptionClick: () => void
}

export const SideMenuOptions: FC<SideMenuOptionsProps> = props => {
  const { onOptionClick } = props
  const { t } = useTranslation()

  const options = useMemo<SideMenuOptionProps[]>(
    () => [
      { label: t('menu.dashboard'), link: '/', icon: <DesktopOutlined /> },
      { label: t('menu.partner-data'), link: '/partner', icon: <FileOutlined /> },
      { label: t('menu.coupons'), link: '/coupons', icon: <FileOutlined /> },
      { label: t('menu.coupon-categories'), link: '/categories', icon: <FileOutlined /> },
      { label: t('menu.sites'), link: '/sites', icon: <FileOutlined /> },
      { label: t('menu.news-letter'), link: '/newsletter', icon: <FileOutlined /> }
    ],
    [t]
  )

  return (
    <Menu theme="dark">
      {options.map((option, i) => (
        <Menu.Item key={i} onClick={onOptionClick}>
          {option.icon}
          <span>{option.label}</span>
          <Link to={option.link} />
        </Menu.Item>
      ))}
    </Menu>
  )
}
