import React, { FC } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { RootState } from 'app/rootReducer';
import { useSelector } from 'react-redux';

interface IProps {
  onClick: () => void
}

export const AuthMenuOptions: FC<IProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const content = {
    icon: isLoggedIn ? 'logout' : 'login',
    label: isLoggedIn ? t('auth.logout') : t('auth.login'),
    link: '/auth',
  }

  return (<>
  <Menu key="auth" theme="dark" >
    <Menu.Item onClick={onClick}>
      <Icon type={content.icon} />
      <span>{content.label}</span>
      <Link to={content.link} />
    </Menu.Item>
  </Menu>
  </>
  )
}
