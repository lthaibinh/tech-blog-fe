import { Avatar, Card, Tag, Typography } from "antd";
import Meta from "antd/es/card/Meta";

export const BlogItem = () => {
  return (
    <Card
      hoverable
      style={{ width: "100%" }}
      cover={
        <img
          style={{ width: "100%", height: "360px", objectFit: "cover" }}
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Typography.Title level={4}>
        Lazy loading vs. Eager loading
      </Typography.Title>
      <div className="flex flex-wrap gap-2">
        {new Array(5).fill(0).map((_, i) => (
          <Tag key={i}>{"react" + i}</Tag>
        ))}
      </div>
      <Typography.Paragraph className="mt-2">
        In this guide, explore lazy loading and error loading as two techniques
        for fetching data in React apps.
      </Typography.Paragraph>
      <Meta
        avatar={
          <Avatar
            className="!h-9 !w-9"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
          />
        }
        title="Njong Emy"
        description="Dec 18, 2024 ⋅ 5 min read"
      />
    </Card>
  );
};
