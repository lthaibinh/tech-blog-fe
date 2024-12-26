"use client";
import { BlogItem } from "@/components/pages/blogs/BlogItem";
import { IInfoCard, InfoCard } from "@/components/pages/home/InfoCard";
import { Button, Col, Grid, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text, Link } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <Row gutter={[32, 32]}>
      {new Array(10).fill(0).map((_, i) => (
        <Col span={12} key={i}>
          <BlogItem />
        </Col>
      ))}
    </Row>
  );
}
