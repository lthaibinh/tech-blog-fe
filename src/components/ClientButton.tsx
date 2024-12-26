"use client";
import { Button, ButtonProps } from "antd";
import { useRouter } from "next/navigation";
import { FC } from "react";
interface IButtonProps extends ButtonProps {
  urlNavigate: string;
}
export const ClientButton: FC<IButtonProps> = ({ urlNavigate }) => {
  const router = useRouter();

  return (
    <Button
      onClick={() => {
        router.push(urlNavigate);
      }}
      type="primary"

    >
      Detail
    </Button>
  );
};
