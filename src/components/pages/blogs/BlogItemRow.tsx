"use client";
import { IBlog } from "@/types/blog";
import { Avatar, Card, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { FC } from "react";
import { IBlogResponse } from "@/types/api";

export const BlogItemRow: FC<IBlogResponse> = ({
  id,
  title,
  description,
  metas,
  userProfile,
  updatedDate,
}) => {
  const router = useRouter();
  const formatedUpdatedDate = updatedDate
    ? format(new Date(updatedDate), "dd-MM-yyyy HH:mm:ss")
    : "";
  return (
    <div
      className="flex flex-col gap-4 cursor-pointer"
      onClick={() => {
        router.push(`/blogs/${id}`);
      }}
    >
      <div>
        <img
          style={{ width: "100%", height: "300px", objectFit: "cover" }}
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {metas?.map((meta, i) => (
            <Tag key={meta.id}>{meta.value}</Tag>
          ))}
        </div>
        <Typography.Title level={4}>{title}</Typography.Title>
        <Typography.Paragraph className="mt-2">
          {description}
        </Typography.Paragraph>
        <div className="flex items-center gap-1">
          <Avatar
            className="!h-9 !w-9"
            src={
              userProfile.avatarUrl ??
              "https://api.dicebear.com/7.x/miniavs/svg?seed=8"
            }
          />
          <p>{userProfile.fullname}</p>
          <p>{formatedUpdatedDate}</p>
        </div>
      </div>
    </div>
  );
};
