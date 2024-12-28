"use client";
import { UserOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSession } from "next-auth/react";
import { Dispatch, FC } from "react";
import { LoginModal } from "./LoginModal";

interface ILoginPopup {
}
export const LoginPopup: FC<ILoginPopup> = ({
  
}) => {
  const { data: session, status } = useSession();
  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;

    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
    const top = (height - 550) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${500 / systemZoom},height=${
        550 / systemZoom
      },top=${top},left=${left}`
    );

    newWindow?.focus();
  };
  if (session) {
    return;
  }
  if (status === "unauthenticated") {
    return (
      <>
        {/* <Button
          icon={<UserOutlined />}
          onClick={() => {
            // popupCenter("/google-signin", "Sign In with google")
          }}
        >
          Sign In
        </Button> */}
        <LoginModal />
        
      </>
    );
  }
};
