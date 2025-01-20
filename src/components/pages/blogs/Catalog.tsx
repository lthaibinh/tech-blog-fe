'use client';
import { List, Typography } from "antd";

export const Catalog: React.FC<{ data: string[]}> = ({data}) => {
    return (
      <div style={{ padding: "20px" }}>
        
        <List
          header={<h3>Catalog</h3>}
         // footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <Typography.Text >{`${index + 1}.`}</Typography.Text> {item}
            </List.Item>
          )}
        />
      </div>
    );
  };
  