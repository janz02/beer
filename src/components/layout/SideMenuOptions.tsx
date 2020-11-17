import React, { FC, useMemo } from 'react'
import { Menu, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { Roles } from 'api/swagger/coupon'
import { hasPermission } from 'services/jwt-reader'
import './SideMenuOptions.scss'
import { useSelector } from 'hooks/react-redux-hooks'
import { RootState } from 'app/rootReducer'
import SubMenu from 'antd/lib/menu/SubMenu'

export interface SideMenuOptionProps {
  label?: string
  labelTooltip?: string
  icon?: JSX.Element
  roles?: Roles[]
  link?: string
  onClick?: () => void
  component?: JSX.Element
  subItems?: SideMenuOptionProps[]
}

export interface SideMenuOptionsProps {
  title?: string
  collapsed?: boolean
  options: SideMenuOptionProps[]
  footer?: boolean
  handleClose: () => void
}

export const SideMenuOptions: FC<SideMenuOptionsProps> = ({
  handleClose,
  options,
  footer,
  collapsed,
  title
}) => {
  const path = useSelector((state: RootState) => state.router.location.pathname)
  const pathRoot = useMemo(() => `/${path.split('/')[1]}`, [path])

  const mapItem = (option: any, index: number): JSX.Element => (
    <Menu.Item
      key={option.link ?? `${footer ? 'footer' : 'main'}_${index}`}
      onClick={() => {
        option.onClick?.()
        handleClose()
      }}
      className={!option.link && !option.onClick ? 'side-menu-nolink' : ''}
    >
      {option.icon}
      <Tooltip title={option.labelTooltip || option.label}>
        <>
          <span>{option.label}</span>
          {option.link && <Link to={option.link} />}
        </>
      </Tooltip>
    </Menu.Item>
  )

  const mapSubMenu = (option: any, index: number): JSX.Element => {
    const key = `submenu_${option.label.replace(' ', '')}_${index}`
    return (
      <SubMenu
        key={key}
        className={`${pathRoot === option.link ? 'ant-menu-item-selected' : ''}`}
        title={
          <>
            {option.icon}
            <Tooltip title={option.labelTooltip || option.label}>
              <>
                <span>{option.label}</span>
                {option.link && <Link to={option.link} />}
              </>
            </Tooltip>
          </>
        }
      >
        {option.subItems.map((subItem: any) => mapOptions([subItem]))}
      </SubMenu>
    )
  }
  const mapOptions = (items: SideMenuOptionProps[]): JSX.Element[] => {
    const filtered = items.filter(option => hasPermission(option.roles ?? []))

    return filtered.map((option, i) => {
      if (option.component) {
        return option.component
      } else {
        return option.subItems ? mapSubMenu(option, i) : mapItem(option, i)
      }
    })
  }

  return (
    <div className={title ? 'section-part' : 'section-part  section-part--without-title'}>
      {title && <div className="section-title">{title || ''}</div>}
      <Menu
        theme="dark"
        selectedKeys={[pathRoot]}
        className={`side-menu-options ${footer ? 'smo-footer' : ''}`}
        mode={collapsed ? 'vertical' : 'inline'}
      >
        {mapOptions(options)}
      </Menu>
    </div>
  )
}
