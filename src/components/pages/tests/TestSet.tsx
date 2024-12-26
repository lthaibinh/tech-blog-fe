"use client";
import { Card, Image, Space } from "antd";
import React, { FC } from "react";
import { ClientButton } from "@/components/ClientButton";

interface ITestSetItem {
  id: string;
  name: string;
  urlImage?: string;
  urlNavigate: string;
}
const { Meta } = Card;

export const TestSetItem: FC<ITestSetItem> = ({
  id,
  name,
  urlNavigate,
  urlImage = "/image/practice.avif",
}) => {
  return (
    <Card
      id={id}
      hoverable
      cover={
        <Image
          className="m-auto"
          src={urlImage}
          fallback="/image/preview.png"
        />
      }
    >
      <div className="flex items-center justify-between">
        <Meta className="uppercase" title={name} />
        <ClientButton urlNavigate={urlNavigate}>Detail</ClientButton>
      </div>
    </Card>
  );
};
