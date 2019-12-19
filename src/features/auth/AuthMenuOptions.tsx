import React, { FC } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { doLogout } from './authenticator/authSlice';

interface IProps {
  onClick: () => void
}

export const AuthMenuOptions: FC<IProps> = ({ onClick }) => {

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector((state: RootState) => state.auth.user);

  const buttonContent = {
    icon: isLoggedIn ? 'logout' : 'login',
    label: isLoggedIn ? t('auth.logout') : t('auth.login'),
    link: '/auth',
    action: () => {
      if (isLoggedIn) {
        dispatch(doLogout())
      }
      onClick()
    }
  }


  return (<>
    <Menu key="auth" theme="dark" >
      <Menu.Item onClick={buttonContent.action}>
        <Icon type={buttonContent.icon} />
        <span>{buttonContent.label}</span>
        <Link to={buttonContent.link} />
      </Menu.Item>
    </Menu>
  </>)
}
