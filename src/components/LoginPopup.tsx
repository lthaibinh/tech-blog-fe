"use client";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { Dispatch, FC } from "react";
import { LoginModal } from "./LoginModal";

interface ILoginPopup {}
export const LoginPopup: FC<ILoginPopup> = ({}) => {
  const { data: session, status } = useSession();
  if (session) {
    return;
  }
  return (
    <>
      <LoginModal />
    </>
  );
};
