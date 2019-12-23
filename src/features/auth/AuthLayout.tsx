import React, { FC } from 'react';
import { Layout, Card } from 'antd';
import { useIsMobile } from 'hooks';
import './auth.scss';

interface AuthLayoutProps {
  title: string;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ title, children }) => {
  const isMobile = useIsMobile();
  
  return (
    <Layout.Content>
      <Card title={title} className={`auth-card ${isMobile ? 'auth-card--mobile' : ''}`}>
        {children}
      </Card>
    </Layout.Content>
  );
};
