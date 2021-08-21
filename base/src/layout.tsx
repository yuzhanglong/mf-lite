import { Layout as AntdLayout, Menu } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { RouterProps, withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';

const { SubMenu } = Menu;

const Layout: React.FC<RouterProps & { route?: any }> = (props) => {
  return (
    <AntdLayout style={{
      height: '100vh',
    }}>
      <AntdLayout.Sider width={250} className='site-layout-background'>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key='sub1' icon={<UserOutlined />} title='选择一个微应用!'>
            <Menu.Item key='1' onClick={() => {
              props.history.push('/vue');
            }}>micro-vue</Menu.Item>
            <Menu.Item key='2' onClick={() => {
              props.history.push('/react');
            }}>micro-react</Menu.Item>
          </SubMenu>
        </Menu>
      </AntdLayout.Sider>
      <AntdLayout.Content
        className='site-layout-background'
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div className={'content'}>
          {renderRoutes(props.route.routes)}
        </div>
      </AntdLayout.Content>
    </AntdLayout>
  );
};

export default withRouter(Layout);
