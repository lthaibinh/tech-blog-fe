import { useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { Button, Flex, Input } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { MarkdownPreview } from "./MarkdownPreview";

// import MarkdownEditor from "./MarkdownEditor";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {};
  const onChange = (value: string) => {
    setContent(value);
  };
  console.log({ content });
  return (
    <Flex vertical className="gap-4">
      <Input placeholder="Tiêu đề" />
      <Flex className="gap-4">
        <Input placeholder="Gắn thẻ bài viết" />
        <Button type="primary" icon={<CheckOutlined />}>
          Submit
        </Button>
      </Flex>
      <MarkdownEditor
        placeholder="Type your content here..."
        value={content}
        onChange={(val) => setContent(val)} // Update shared content
      />
       {/* Preview */}
       {/* <div className="w-1/2 p-4">
        <MarkdownPreview content={content} />
      </div> */}
    </Flex>
  );
};

export default NewPost;
