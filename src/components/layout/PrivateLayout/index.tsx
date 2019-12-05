import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Logo from 'assets/img/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSelector from 'components/widgets/LanguageSelector';

const PrivateLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();

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
            <span>{t('menu.create-coupon')}</span>
          </Menu.Item>
          <Menu.Item>
            <Icon type="file" />
            <span>{t('menu.edit-coupon')}</span>
          </Menu.Item>
        </Menu>
        <LanguageSelector menuCollapsed={collapsed} />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            style={{ paddingLeft: '25px' }}
            className="trigger"
            type={'menu'}
            onClick={() => setCollapsed(!collapsed)}
          />
          <img
            src={Logo}
            alt="Logo"
            title="Logo"
            style={{ width: '150px', color: 'black', paddingLeft: '25px' }}
          />
        </Layout.Header>
        <Layout.Content>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
