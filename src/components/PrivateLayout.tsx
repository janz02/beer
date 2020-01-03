import React, { useState, useEffect } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { MenuOutlined, DesktopOutlined, FileOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useIsMobile } from 'hooks';
import { AuthMenuOptions } from 'features/auth/AuthMenuOptions';
import LanguageSelector from 'components/LanguageSelector';
import Logo from 'assets/img/logo.svg';


const PrivateLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [menuOpened, setMenuOpened] = useState(!isMobile);
  const [lastMediaQuery, setLastMediaQuery] = useState(isMobile);

  const closeDrawer = () => {
    if (isMobile) {
      setMenuOpened(false);
    }
  };

  useEffect(() => {
    if (lastMediaQuery !== isMobile) {
      if (isMobile) {
        setMenuOpened(false);
      }
    }
    setLastMediaQuery(isMobile);
  }, [isMobile, lastMediaQuery]);

  const NavigationContent = () => {
    return (
      <>
        <Menu theme="dark">
          <Menu.Item onClick={closeDrawer}>
            <DesktopOutlined />
            <span>{t('menu.dashboard')}</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item onClick={closeDrawer}>
            <FileOutlined />
            <span>{t('menu.coupons')}</span>
            <Link to="/coupons" />
          </Menu.Item>
        </Menu>
        <AuthMenuOptions onClick={closeDrawer} />
        <LanguageSelector menuClosed={!menuOpened} />
      </>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {isMobile ? (
        <Drawer
          drawerStyle={{
            backgroundColor: '#001529',
          }}
          bodyStyle={{
            padding: '0',
          }}
          placement="left"
          closable={false}
          onClose={() => setMenuOpened(false)}
          visible={menuOpened}
        >
          <NavigationContent />
        </Drawer>
      ) : (
          <Layout.Sider
            trigger={null}
            collapsible
            collapsed={!menuOpened}
            onCollapse={(collapsed) => setMenuOpened(collapsed)}
          >
            <NavigationContent />
          </Layout.Sider>
        )}

      <Layout>
        <Layout.Header style={{ background: '#fff', padding: 0 }}>
          <MenuOutlined
            style={{ paddingLeft: '25px' }}
            onClick={() => setMenuOpened(!menuOpened)}
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
