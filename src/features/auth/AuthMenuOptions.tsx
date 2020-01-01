import React, { FC } from 'react';
import { Menu } from 'antd';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'app/rootReducer';
import { logout } from './authSlice';

interface AuthMenuOptionsProps {
  onClick: () => void;
}

export const AuthMenuOptions: FC<AuthMenuOptionsProps> = ({ onClick }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { loggedIn } = useSelector((state: RootState) => state.auth);

  const buttonContent = {
    icon: loggedIn ? <LogoutOutlined /> : <LoginOutlined />,
    label: loggedIn ? t('auth.logout') : t('auth.login'),
    link: '/auth',
    action: () => {
      if (loggedIn) {
        dispatch(logout());
      }
      onClick();
    },
  };

  return (
    <Menu key="auth" theme="dark">
      <Menu.Item onClick={buttonContent.action}>
        {buttonContent.icon}
        <span>{buttonContent.label}</span>
        <Link to={buttonContent.link} />
      </Menu.Item>
    </Menu>
  );
};
