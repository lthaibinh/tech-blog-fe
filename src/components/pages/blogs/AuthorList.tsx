"use client";

import { IUserProfile } from "@/types";
import {
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Divider, Flex, List, Statistic, Typography } from "antd";
export const AuthorList: React.FC<{ data: IUserProfile[] }> = ({ data }) => {
  return (
    <div style={{ padding: "20px" }}>
      <List
        header={<h3>Top Writers</h3>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={data}
        renderItem={(item, index) => (
          <>
            <div className="p-4">
              <Flex className="gap-2">
                <Avatar size={48} src={item.avatarUrl} />
                <Flex vertical justify="space-evenly" className="">
                  <p className="font-bold">{item.fullname}</p>
                  <p className="text-gray-700">{item.email}</p>
                  <Button type="primary">Follow</Button>
                </Flex>
              </Flex>
              <Flex align="center" justify="center" className="gap-2 mt-2">
                <Flex className="gap-1">
                  <Statistic value={1128} prefix={<HeartOutlined />} />
                </Flex>

                <Flex className="gap-1">
                  <Statistic value={1128} prefix={<EditOutlined />} />
                </Flex>

                <Flex className="gap-1">
                  <Statistic value={1128} prefix={<UsergroupAddOutlined />} />
                </Flex>

                <Flex className="gap-1">
                  <Statistic value={1128} prefix={<EyeOutlined />} />
                </Flex>
              </Flex>
            </div>
            <Divider />
          </>
        )}
      />
    </div>
  );
};
