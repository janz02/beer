import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon, Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Logo from 'assets/img/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSelector from 'components/LanguageSelector';
import { Link } from 'react-router-dom';

const PrivateLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const isMobile = !useMediaQuery({
    query: '(min-device-width: 576px)',
  });

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
      <React.Fragment>
        <Menu theme="dark" mode="inline">
          <Menu.Item onClick={closeDrawer}>
            <Icon type="desktop" />
            <span>{t('menu.create-coupon')}</span>
            <Link to="/" />
          </Menu.Item>
          <Menu.Item onClick={closeDrawer}>
            <Icon type="file" />
            <span>{t('menu.edit-coupon')}</span>
            <Link to="/test" />
          </Menu.Item>
        </Menu>
        <LanguageSelector menuClosed={!menuOpened} />
      </React.Fragment>
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
          <Icon
            style={{ paddingLeft: '25px' }}
            type={'menu'}
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
