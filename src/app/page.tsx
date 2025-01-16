// File: app/page.tsx
import { BlogItem } from "@/components/pages/blogs/BlogItem";
import { getAllBlogPost } from "@/services/blogServies";
import { IBlog } from "@/types/blog";
import { Col, Row } from "antd";
import { lastValueFrom } from "rxjs";

export default async function Home() {
  let blogs: IBlog[] = [];

  try {
    blogs = await lastValueFrom(getAllBlogPost()); // Convert RxJS observable to promise
  } catch (error) {
    console.error("Error fetching blogs:", error);
  }

  return (
    <Row gutter={[32, 32]}>
      {blogs.map((item) => (
        <Col span={12} key={item.id}>
          <BlogItem
            id={item.id}
            title={item.title}
            content={item.content}
            author={item.author}
          />
        </Col>
      ))}
    </Row>
  );
}
