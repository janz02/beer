import React, { FC, useMemo } from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import { Roles } from 'api/swagger/models'
import { hasPermission } from 'services/jwt-reader'
import './SideMenuOptions.scss'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'

export interface SideMenuOptionProps {
  label: string
  icon: JSX.Element
  roles?: Roles[]
  link?: string
  onClick?: () => void
}

export interface SideMenuOptionsProps {
  options: SideMenuOptionProps[]
  footer?: boolean
  handleClose: () => void
}

export const SideMenuOptions: FC<SideMenuOptionsProps> = props => {
  const { handleClose, options, footer } = props

  const path = useSelector((state: RootState) => state.router.location.pathname)

  const pathRoot = useMemo(() => `/${path.split('/')[1]}`, [path])

  return (
    <Menu
      theme="dark"
      selectedKeys={[pathRoot]}
      className={`side-menu-options ${footer ? 'smo-footer' : ''}`}
    >
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
            <span>{option.label}</span>
            {option.link && <Link to={option.link} />}
          </Menu.Item>
        ))}
    </Menu>
  )
}
