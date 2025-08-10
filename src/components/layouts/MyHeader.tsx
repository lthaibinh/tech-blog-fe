"use client";
import React, { useState } from "react";
import {
  Avatar,
  Button,
  Drawer,
  Image,
  Input,
  Layout,
  Menu,
  Space,
  Grid,
} from "antd";
import {
  LogoutOutlined,
  MenuOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LoginPopup } from "../LoginPopup";
import { UserInfoDrawer } from "../pages/UserInfoDrawer";
import { NotificationDrawer } from "../pages/NotificationDrawer";

const { Header } = Layout;
const { useBreakpoint } = Grid;

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
  const { data: session } = useSession();
  const screens = useBreakpoint();
  const [drawerVisible, setDrawerVisible] = useState(false);
  console.log('screens', screens)
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
          justifyContent: "space-between",
          padding: "0 16px",
        }}
        className="!bg-transparent max-w-[1360px] mx-auto !px-0 gap-4"
      >
        {/* Logo */}
        <p
          className="text-xl font-extrabold logoName text-green-800 cursor-pointer"
          onClick={() => router.push("/")}
        >
          Daily Tech Blog
        </p>

        {/* Search input (can hide on very small screens if needed) */}
        {!screens.xs && (
          <Space.Compact size="large" className="mx-10 w-80">
            <Input addonBefore={<SearchOutlined />} placeholder="Tìm kiếm..." />
          </Space.Compact>
        )}

        {/* Menu for large screens */}
        {!screens.xs ? (
          <Menu
            theme="light"
            mode="horizontal"
            className="!bg-transparent flex-1"
            defaultSelectedKeys={[parts && parts.length > 0 ? parts[0] : "/"]}
            items={menuItems}
          />
        ) : (
          <>
            <Button
              className="-order-1"
              type="text"
              icon={<MenuOutlined style={{ fontSize: 20 }} />}
              onClick={() => setDrawerVisible(true)}
            />
            <Drawer
              title="Menu"
              placement="left"
              onClose={() => setDrawerVisible(false)}
              open={drawerVisible}
            >
              <Menu
                mode="vertical"
                defaultSelectedKeys={[
                  parts && parts.length > 0 ? parts[0] : "/",
                ]}
                items={menuItems}
                onClick={() => setDrawerVisible(false)} // Close drawer when a menu item is clicked
              />
            </Drawer>
          </>
        )}

        {/* Right-side icons */}
        <div className="flex items-center gap-4">
          <NotificationDrawer />
          {session && <UserInfoDrawer />}
          <LoginPopup />
        </div>
      </Header>
    </div>
  );
};
