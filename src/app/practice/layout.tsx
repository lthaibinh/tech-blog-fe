"use client";
import React, { FC } from "react";
import { Layout, theme } from "antd";
import { MyBreadcrumb } from "@/components/MyBreadcrumb";
const { Header, Content, Footer } = Layout;
interface IProps {
  children?: React.ReactNode;
}
export default function RootLayout({ children }: IProps) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Content className=" !min-h-[calc(100vh-126px)] max-w-[1200px] w-full mx-auto">
      <MyBreadcrumb />
      <div
        // className="bg-primary"
        style={{
          padding: 48,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          marginBottom: 54,
        }}
      >
        {children}
      </div>
    </Content>
  );
}
