"use client";

import { notification } from "antd";
import { useEffect } from "react";

export const ToastNotification = ({
  type,
  message,
  description,
}: {
  type: "success" | "error" | "info";
  message: string;
  description?: string;
}) => {
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (!message || !type) return;
    api.open({
      type,
      message,
      description,
    });
  }, [type, message, description]);
  return <>{contextHolder}</>;
};
