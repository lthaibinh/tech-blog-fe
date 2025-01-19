import React, { useState } from "react";
import type { DrawerProps, RadioChangeEvent, TabsProps } from "antd";
import {
  Avatar,
  Badge,
  Button,
  Drawer,
  Flex,
  List,
  Tabs,
  Tag,
  Typography,
} from "antd";
import ProfileIcon from "@/assets/icons/profile.svg";
import BellIcon from "@/assets/icons/bell.svg";
const mockupData: { title: string; icon: string }[] = new Array(100)
  .fill(0)
  .map((_, index) => ({
    title: "Anderlee sent you a friend request " + index,
    icon: ProfileIcon,
  }));
const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <div>
        <Typography.Text>All</Typography.Text>
        <Tag color="processing" className="!ml-1">
          20
        </Tag>
      </div>
    ),
    children: (
      <List
        className="h-[calc(100vh-156px)] overflow-y-scroll"
        dataSource={mockupData}
        renderItem={(item) => (
          <List.Item>
            <Flex gap={"middle"}>
              <Avatar
                size={32}
                src="https://assets.minimals.cc/public/assets/images/mock/avatar/avatar-25.webp"
              />
              <Flex vertical>
                <Typography.Text>{item.title}</Typography.Text>
                <Typography.Text type="secondary">
                  {"13 minutes"}
                </Typography.Text>
              </Flex>
            </Flex>
          </List.Item>
        )}
      />
    ),
  },
  {
    key: "2",
    label: (
      <div>
        <Typography.Text>Unread</Typography.Text>
        <Tag color="processing" className="!ml-1">
          20
        </Tag>
      </div>
    ),
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
        className="[&_.ant-drawer-body]:!pr-0"
        placement={"right"}
        closable={false}
        onClose={onClose}
        open={open}
      >
        <Typography.Title className="" level={3}>
          Notification
        </Typography.Title>
        <Tabs defaultActiveKey="1" items={items}  />
        
      </Drawer>
    </>
  );
};
