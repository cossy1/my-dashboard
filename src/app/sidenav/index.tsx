import { Layout, Menu } from "antd";
import React, { useState } from "react";

const { Sider } = Layout;

export const SideNav = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      theme={"light"}
    >
      <Menu defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item
          key="2"
          icon={
            <span className={"anticon"}>
              <i className="ri-dashboard-line" />
            </span>
          }
        >
          Dashboard
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
