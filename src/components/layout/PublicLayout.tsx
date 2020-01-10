import React, { FC } from 'react';
import { Layout } from 'antd';
import { Header } from './Header';
import './layout.scss';

const PublicLayout: FC = ({ children }) => {
  return (
    <Layout className="layout">
      <Layout>
        <Header empty />
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PublicLayout;
