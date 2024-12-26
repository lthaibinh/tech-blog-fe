// import { ClientButton } from "@/components/ClientButton";
import { TestSetItem } from "@/components/pages/tests/TestSet";
import pool from "@/lib/pg";
import { Card, Col, Image, Row } from "antd";
import React from "react";

async function getData(set: string) {
  try {
    const query = "SELECT * FROM test";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return [];
  }
}
const { Meta } = Card;

export default async function TestSet({ params }: { params: { set: string } }) {
  const data = await getData(params.set);
  return (
    <>
      <Row gutter={[16, 24]}>
        {data.map((i, index) => {
          return (
            <Col key={i.id} className="gutter-row" span={24} md={{span: 6}}>
              <TestSetItem
                id={i.id}
                name={i.name}
                urlNavigate={`/practice/${params.set}/${i.id}`}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
