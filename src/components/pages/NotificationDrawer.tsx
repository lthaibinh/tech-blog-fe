import React, { useState } from "react";
import type { DrawerProps, RadioChangeEvent, TabsProps } from "antd";
import {
  Avatar,
  Badge,
  Button,
  Divider,
  Drawer,
  Flex,
  Image,
  List,
  Radio,
  Space,
  Tabs,
  Typography,
} from "antd";
import ProfileIcon from "@/assets/icons/profile.svg";
import SettingIcon from "@/assets/icons/setting.svg";
import Icon, { UserOutlined } from "@ant-design/icons";
import BellIcon from "@/assets/icons/bell.svg";
const mockupData: { title: string; icon: string }[] = [
  {
    title: "profile",
    icon: ProfileIcon,
  },
  {
    title: "setting",
    icon: SettingIcon,
  },
];
const items: TabsProps["items"] = [
  {
    key: "1",
    label: "All",
    children: "Content of Tab Pane 1",
  },
  {
    key: "2",
    label: "Unread",
    children: "Content of Tab Pane 2",
  },
];
export const NotificationDrawer: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("left");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  return (
    <>
      <Badge count={5}>
        <Button
          shape="circle"
          icon={<Avatar size={32} icon={<BellIcon />} />}
          onClick={showDrawer}
        />
      </Badge>
      <Drawer
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Typography.Title level={3}>Notification</Typography.Title>
        <Tabs defaultActiveKey="1" items={items} />
        <Flex vertical justify="center" align="center" className="header-info">
          <Avatar
            size={64}
            src="https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"
          />
          <Typography.Title level={5}>Binh Le</Typography.Title>
          <Typography.Text>binhle@gmail.com</Typography.Text>
        </Flex>
        <Divider />
        <List
          dataSource={mockupData}
          renderItem={(item) => (
            <List.Item>
              <Flex gap={"small"}>
                <span className="text-[#637381]">{<item.icon />}</span>{" "}
                {item.title}
              </Flex>
            </List.Item>
          )}
        />
        <Divider />
        <Button className="w-full" type="primary" danger>
          Logout
        </Button>
      </Drawer>
    </>
  );
};
