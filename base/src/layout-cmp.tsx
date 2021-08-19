import { Layout, Menu } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const LayoutCmp: React.FC = () => {
  return (
    <Layout style={{
      height: '100vh',
    }}>
      <Layout.Sider width={250} className='site-layout-background'>
        <Menu
          mode='inline'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <SubMenu key='sub1' icon={<UserOutlined />} title='子应用将AXAXAX在右侧渲染!!!!'>
            <Menu.Item key='1'>micro-vue</Menu.Item>
            <Menu.Item key='2'>micro-react</Menu.Item>
          </SubMenu>
        </Menu>
      </Layout.Sider>
      <Layout.Content
        className='site-layout-background'
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
        }}
      >
        <div id={'micro-app'}/>
      </Layout.Content>
    </Layout>
  );
};

export default LayoutCmp;
