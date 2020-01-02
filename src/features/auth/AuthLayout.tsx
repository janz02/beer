import React, { FC } from 'react';
import { Layout, Card } from 'antd';
import { useIsMobile } from 'hooks';
import './auth.scss';

interface AuthLayoutProps {
  title: string;
  className?: string;
}

export const AuthLayout: FC<AuthLayoutProps> = props => {
  const { title, className, children } = props;
  const isMobile = useIsMobile();

  return (
    <Layout.Content>
      <Card
        title={title}
        className={`auth-card ${className} ${isMobile ? 'auth-card--mobile' : ''}`}
      >
        {children}
      </Card>
    </Layout.Content>
  );
};
