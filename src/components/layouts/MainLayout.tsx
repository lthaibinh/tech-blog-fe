"use client";
import React, { FC } from "react";
import { Layout, Row } from "antd";
import { MyHeader } from "./MyHeader";
import { Vocabulary } from "../Vocabulary";
import { BodyLayout } from "./BodyLayout";
const { Header, Content, Footer } = Layout;

export const MainLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout className="!bg-mainGradient">
      <MyHeader />
      {/* <div className=" w-full mx-auto h-96 text-left bg-homepage bg-cover bg-no-repeat bg-right items-start justify-center" /> */}
      {/* <div
        className="flex justify-center items-center"
        style={{
          backgroundImage: "url('/image/bg-homepage.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "16rem",
        }}
      >
        <h1 className="text-4xl font-bold text-white">The future of web development: what's next in 2024</h1>
      </div> */}

      {/* <BodyLayout>{children}</BodyLayout> */}
      {children}

      <Footer className="!bg-transparent" style={{ textAlign: "center" }}>
        Daily Tech Blog ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
