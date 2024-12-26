import { TestSetItem } from "@/components/pages/tests/TestSet";
import pool from "@/lib/pg";
import { Col, Row } from "antd";
import React from "react";

async function getData(set: string) {
  try {
    const query = "SELECT * FROM part";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return [];
  }
}
export default async function TestSet({
  params,
}: {
  params: { set: string; test: string };
}) {
  const data = await getData(params.test);
  return (
    <>
      <Row gutter={[16, 24]}>
        {data.map((i) => {
          return (
            <Col key={i.id} className="gutter-row" span={24} md={{span: 6}}>
              <TestSetItem
                id={i.id}
                name={i.name}
                urlNavigate={`/practice/${params.set}/${params.test}/${i.id}`}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
