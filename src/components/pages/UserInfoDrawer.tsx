import React, { useState } from "react";
import type { DrawerProps, RadioChangeEvent } from "antd";
import {
  Avatar,
  Button,
  Divider,
  Drawer,
  Flex,
  Image,
  List,
  Radio,
  Space,
  Typography,
} from "antd";
import ProfileIcon from "@/assets/icons/profile.svg";
import SettingIcon from "@/assets/icons/setting.svg";
import Icon, { UserOutlined } from "@ant-design/icons";

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
export const UserInfoDrawer: React.FC = () => {
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
      <Button
        type="primary"
        icon={<Avatar size={32} icon={<UserOutlined />} />}
        onClick={showDrawer}
      />
      <Drawer
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
      >
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
