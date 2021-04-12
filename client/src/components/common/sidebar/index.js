/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import data from './data';
import { onLogout } from '../../../services/auth';

const { SubMenu } = Menu;
const { Sider } = Layout;

const Sidebar = props => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuSubItem = data => {
    return (
      <SubMenu
        key={data.key}
        title={
          <span>
            <Icon type={data.type} />
            {!isCollapsed && data.name}
          </span>
        }
      >
        {data.menuSubItem.map(data => {
          return (
            <Menu.Item key={data.key}>
              <Icon type={data.type} />
              <span className="nav-text">{data.name}</span>
            </Menu.Item>
          );
        })}
      </SubMenu>
    );
  };

  const handleClick = e => {
    if (e.key === 'logout') onLogout();
    else props.history.push(`/${e.key}`);
  };

  const menuItem = data => {
    return (
      <Menu.Item key={data.key}>
        <Icon type={data.type} />
        <span className="nav-text">{data.name}</span>
      </Menu.Item>
    );
  };
  const defaultSelectedKeys = [props.location.pathname.slice(1)];
  return (
    <Sider
      breakpoint="lg"
      // collapsedWidth="500"
      collapsible
      collapsed={isCollapsed}
      onBreakpoint={() => {
      }}
      onCollapse={setIsCollapsed}
    >
      <Menu
        onClick={handleClick}
        mode="inline"
        theme="dark"
        defaultSelectedKeys={defaultSelectedKeys}
        style={{ height: '100%', borderRight: 5 }}
      >
        {data.map(data => {
          return data.menuSubItem ? menuSubItem(data) : menuItem(data);
        })}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
