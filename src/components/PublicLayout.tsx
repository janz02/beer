import React from 'react';
import { Layout } from 'antd';
import Logo from 'assets/img/logo.svg';



const PublicLayout: React.FC = ({ children }) => {

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
        <img
          src={Logo}
          alt="Logo"
          title="Logo"
          style={{ width: '150px', color: 'black', paddingLeft: '25px' }}
        />
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
};

export default PublicLayout;
