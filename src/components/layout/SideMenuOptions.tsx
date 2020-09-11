import React, { FC, useMemo } from 'react'
import { Menu, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { Roles } from 'api/swagger/coupon'
import { hasPermission } from 'services/jwt-reader'
import './SideMenuOptions.scss'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import { LanguageSelector } from 'components/LanguageSelector'
import { AppVersion } from 'components/layout/AppVersion'

export interface SideMenuOptionProps {
  label: string
  labelTooltip?: string
  icon: JSX.Element
  roles?: Roles[]
  link?: string
  onClick?: () => void
}

export interface SideMenuOptionsProps {
  collapsed?: boolean
  options: SideMenuOptionProps[]
  footer?: boolean
  handleClose: () => void
}

export const SideMenuOptions: FC<SideMenuOptionsProps> = props => {
  const { handleClose, options, footer, collapsed } = props

  const path = useSelector((state: RootState) => state.router.location.pathname)

  const pathRoot = useMemo(() => `/${path.split('/')[1]}`, [path])

  return (
    <Menu
      theme="dark"
      selectedKeys={[pathRoot]}
      className={`side-menu-options ${footer ? 'smo-footer' : ''}`}
    >
      {footer && (
        <LanguageSelector className="side-menu-vertical-delimiter" collapsed={collapsed} />
      )}
      {options
        .filter(option => hasPermission(option.roles ?? []))
        .map((option, i) => (
          <Menu.Item
            key={option.link ?? `${footer ? 'footer' : 'main'}_${i}`}
            onClick={() => {
              option.onClick?.()
              handleClose()
            }}
            className={!option.link && !option.onClick ? 'side-menu-nolink' : ''}
          >
            {option.icon}
            <Tooltip title={option.labelTooltip}>
              <span>{option.label}</span>
            </Tooltip>
            {option.link && (
              <Tooltip title={option.labelTooltip}>
                <Link to={option.link} />
              </Tooltip>
            )}
          </Menu.Item>
        ))}
      {footer && <AppVersion hide={collapsed} className="side-menu-vertical-delimiter" />}
    </Menu>
  )
}
