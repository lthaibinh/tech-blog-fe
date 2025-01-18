"use client";
import React, { FC } from "react";
import { Layout, Row } from "antd";
import { MyHeader } from "./MyHeader";
import { Vocabulary } from "../Vocabulary";
import { BodyLayout } from "./BodyLayout";
const { Header, Content, Footer } = Layout;

export const DetailsLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className="!bg-mainGradient">
      <MyHeader />
      {/* <div className=" w-full mx-auto h-96 text-left bg-homepage bg-cover bg-no-repeat bg-right items-start justify-center" /> */}
      

      <BodyLayout>{children}</BodyLayout>
      <Footer className="!bg-transparent" style={{ textAlign: "center" }}>
        Daily Tech Blog ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
