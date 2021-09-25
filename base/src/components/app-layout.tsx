import { Layout, Menu, Select } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import './app-layout.css';

import React, { useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { LANGUAGE_MAP } from '~src/common/const';

const { Header, Content, Sider } = Layout;

interface AppLayoutProps extends RouteComponentProps {

}


const AppLayout: React.FC<AppLayoutProps> = (props) => {
  // @ts-ignore
  const { location, history, route } = props;
  const [currentApp, setCurrentApp] = useState<string>(location.pathname === '/' ? '/' : 'react');

  const onSelectorChange = (key: string) => {
    setCurrentApp(key);
    history.push(key);
  };
  return (
    <Layout id='components-layout-demo-fixed-sider'>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className='logo' />
        <Menu theme='dark' mode='inline' selectedKeys={[currentApp]} onSelect={(info) => onSelectorChange(info.key)}>
          <Menu.Item key='/' icon={<UserOutlined />}>
            Base App
          </Menu.Item>
          <Menu.Item key='react' icon={<VideoCameraOutlined />}>
            React App
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout' style={{ marginLeft: 200 }}>
        <Header className='site-layout-background' style={{ padding: 0, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ marginRight: 16 }}>
            <Select defaultValue='Chinese' style={{ width: 120 }} onSelect={async (v) => {
              await intl.setLocal(v);
            }}>
              <Select.Option value={LANGUAGE_MAP.zh}>简体中文</Select.Option>
              <Select.Option value={LANGUAGE_MAP.en}>English</Select.Option>
            </Select>
          </div>

        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: '100vh' }}>
          <div className='site-layout-background' style={{ padding: 24, textAlign: 'center' }}>
            {renderRoutes(route.routes)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(AppLayout);
