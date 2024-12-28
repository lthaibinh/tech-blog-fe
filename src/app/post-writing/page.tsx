"use client";
import { BlogItem } from "@/components/pages/blogs/BlogItem";
import NewPost from "@/components/pages/blogs/NewPost";
import { IInfoCard, InfoCard } from "@/components/pages/home/InfoCard";
import { Button, Col, Grid, Row, Space, Typography } from "antd";
import { useRouter } from "next/navigation";

const { Title, Paragraph, Text, Link } = Typography;

export default function PostWriting() {

  return (
    <NewPost />
  );
}
