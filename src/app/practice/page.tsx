import TestItem from "@/components/pages/tests/TestItem";
import { TestSetItem } from "@/components/pages/tests/TestSet";
import pool from "@/lib/pg";
import { Col, Row } from "antd";
import React from "react";
import type { Metadata } from 'next'
 

async function getData() {
  try {
    const query = "SELECT * FROM set where set.id = 'ets2024' or set.id = 'ets2023' or set.id = 'ets2022'";
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    return []
  }
}
export default async function TestSet() {
  const data = await getData()
  return (
    <>
      <Row gutter={[16, 24]}>
      {data.map(({id, name},index) => {
        return (
          <Col key={index} className="gutter-row" span={24} md={{span: 6}}>
            <TestSetItem id={id} name={name} urlNavigate={`/practice/${id}`} />
          </Col>
        );
      })}
      </Row>
    </>
  );
}
