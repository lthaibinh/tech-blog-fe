import { Button, Card } from "antd";
import React from "react";

export default function TestItem() {
  return (
    <Card
      title="Practice Set 2022"
      bordered={false}
      style={{
       
      }}
      bodyStyle={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <p>Test 1</p>
      <p>Part 4</p>
      <p>30 mins</p>
      <Button type="primary" shape="round">
        Practice
      </Button>
    </Card>
  );
}
