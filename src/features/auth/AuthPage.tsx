import React, { FC } from 'react';
import { Layout } from 'antd';
import { Authenticator } from './authenticator/Authenticator';
import './AuthPage.scss';

export const AuthPage: FC = () => {
  return (
    <Layout.Content className="auth-page">
      <Authenticator />
    </Layout.Content>
  );
};
