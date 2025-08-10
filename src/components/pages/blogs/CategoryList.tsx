"use client";

import { ICategory } from "@/types";
import {
  EditOutlined,
  EyeOutlined,
  HeartOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  List,
  Statistic,
  Tag,
  Typography,
} from "antd";
export const CategoryList: React.FC<{ data: ICategory[] }> = ({ data }) => {
  return (
    <div style={{ padding: "20px" }}>
      <List
        className="category-list"
        header={<h3>Popular Categories</h3>}
        // footer={<div>Footer</div>}
        bordered
        dataSource={data}

        renderItem={(item, index) => (
          <>
            <span className="p-1">
              <Tag  key={item.id}>{item.name}</Tag>
            </span>
          </>
        )}
      />
    </div>
  );
};
