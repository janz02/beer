import React, { useState } from 'react';
import { Layout, Menu, Icon, Drawer } from 'antd';
import { useMediaQuery } from 'react-responsive';
import Logo from 'assets/img/logo.svg';
import { useTranslation } from 'react-i18next';
import LanguageSelector from 'components/widgets/LanguageSelector';

const PrivateLayout: React.FC = ({ children }) => {
  const { t } = useTranslation();

  const isMobile = !useMediaQuery({
    query: '(min-device-width: 576px)',
  });

  const [menuOpened, setMenuOpened] = useState(!isMobile);

  const NavigationContent = () => {
    return (
      <React.Fragment>
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
