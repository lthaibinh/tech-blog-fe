"use client";
import { IInfoCard, InfoCard } from "@/components/pages/home/InfoCard";
import { Button, Col, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text, Link } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div>home page hieeee</div>
    </>
  );
}
