
import { BodyLayout } from "@/components/layouts/BodyLayout";
import { BlogItem } from "@/components/pages/blogs/BlogItem";
import { getAllBlogPost } from "@/services/blogServies";
import { IBlog } from "@/types/blog";
import { Col, Row } from "antd";
import { lastValueFrom } from "rxjs";
import { ToastNotification } from "@/components/NotificationProvider";
import { Empty } from "antd";
export default async function Home() {
  let blogs: IBlog[] = [];
  let toastProps = {
    type: "",
    message: "",
    description: "",
  };
  try {
    blogs = await lastValueFrom(getAllBlogPost()); // Convert RxJS observable to promise
  } catch (error: any) {
    console.error("Error fetching blogs:", error);
    toastProps = {
      type: "error",
      message: "Error fetching blogs",
      description: error.message,
    };
  }

  return (
    <>
      <ToastNotification
        type={toastProps.type as any}
        message={toastProps.message}
        description={toastProps.description}
      />

      {/* <div className=" w-full mx-auto h-96 text-left bg-homepage bg-cover bg-no-repeat bg-right items-start justify-center" /> */}
      <BodyLayout>
        {blogs.length === 0 && <Empty />}
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
