"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Layout,
  List,
  Menu,
  MenuProps,
  Popover,
} from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
const { Header, Content, Footer } = Layout;
import { useRouter } from "next/navigation";
import {
  LogoutOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { LoginPopup } from "../LoginPopup";
import { Input, Select, Space } from "antd";
import { UserInfoDrawer } from "../pages/UserInfoDrawer";
import { NotificationDrawer } from "../pages/NotificationDrawer";

const menuItems: { key: string; label: React.ReactNode }[] = [
  {
    key: "/blogs",
    label: <Link href={"/blogs"}>Bài viết</Link>,
  },
  {
    key: "/post-writing",
    label: <Link href={"/post-writing"}>Viết bài</Link>,
  },
  {
    key: "/questions",
    label: <Link href={"/practice"}>Hỏi đáp</Link>,
  },
  {
    key: "/discussion",
    label: <Link href={"/practice"}>Thảo luận</Link>,
  },
];

export const MyHeader = () => {
  const pathname = usePathname();
  const parts = pathname?.match(/^\/\w+/);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <div
      className="bg-mainGradient"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Header
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
        className="!bg-transparent max-w-[1200px] mx-auto !px-0"
      >
        <p
          className="text-xl font-extrabold logoName text-green-800"
          onClick={() => {
            router.push("/");
          }}
        >
          Daily Tech Blog
        </p>
        <Space.Compact size="large" className="mx-10 w-80">
          <Input addonBefore={<SearchOutlined />} placeholder="large size" />
        </Space.Compact>
        <div className="flex-1">
          <Menu
            theme="light"
            mode="horizontal"
            className="!bg-transparent"
            defaultSelectedKeys={[parts && parts.length > 0 ? parts[0] : "/"]}
            items={menuItems}
          />
        </div>

        {/* <List
          
          dataSource={menuItems}
          renderItem={(item) => <List.Item>{item.label}</List.Item>}
        ></List> */}

        <div className="flex gap-4">
          <NotificationDrawer />
          {session && (
            // <Popover
            //   content={
            //     <Button
            //       className="w-full !bg-red-600 !text-white"
            //       icon={<LogoutOutlined />}
            //       onClick={() => {
            //         hide();
            //         signOut();
            //       }}
            //     >
            //       Sign Out
            //     </Button>
            //   }
            //   title={session?.user?.name}
            //   trigger="click"
            //   open={open}
            //   onOpenChange={handleOpenChange}
            // >
            //   <Avatar
            //     size={32}
            //     icon={
            //       session?.user?.image ? (
            //         <Image
            //           preview={false}
            //           width={32}
            //           src={session?.user?.image || ""}
            //         />
            //       ) : (
            //         <UserOutlined />
            //       )
            //     }
            //   />
            // </Popover>
            <UserInfoDrawer />
          )}
        </div>
        <LoginPopup />
      </Header>
    </div>
  );
};
