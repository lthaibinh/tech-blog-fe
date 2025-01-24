// File: app/page.tsx
import { BodyLayout } from "@/components/layouts/BodyLayout";
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
    <>
      <div className=" w-full mx-auto h-96 text-left bg-homepage bg-cover bg-no-repeat bg-right items-start justify-center" />
      <BodyLayout>
        <Row gutter={[32, 32]}>
          {blogs.map((item) => (
            <Col span={12} key={item.id}>
              <BlogItem {...item} />
            </Col>
          ))}
        </Row>
      </BodyLayout>
    </>
  );
}
