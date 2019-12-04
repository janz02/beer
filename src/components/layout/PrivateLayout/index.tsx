import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { useMediaQuery } from 'react-responsive';

const PrivateLayout: React.FC = ({ children }) => {
  const isMobile = !useMediaQuery({
    query: '(min-device-width: 576px)',
  });

  const [collapsed, setCollapsed] = useState(isMobile);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        collapsedWidth={!isMobile ? 80 : 0}
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={(collapsed) => setCollapsed(collapsed)}
      >
        <Menu theme="dark" mode="inline">
          <Menu.Item>
            <Icon type="desktop" />
            <span>Create coupon</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="file" />
            <span>Edit coupon</span>
          </Menu.Item>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            style={{ paddingLeft: '25px' }}
            className="trigger"
            type={'menu'}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
