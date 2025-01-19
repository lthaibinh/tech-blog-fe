import { useMemo, useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { Button, Flex, Input, Select, SelectProps, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

// import MarkdownEditor from "./MarkdownEditor";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [preview, setPreview] = useState("");
  const handleSubmit = async () => {
    console.log("binhtest content:", { content });
  };

  const handleEditorChange = (value: string) => {
    setContent(value);
  };
  const options: SelectProps["options"] = new Array(10)
    .fill(0)
    .map((_, index) => ({
      label: `Option ${index + 1}`,
      value: `opt${index + 1}`,
    }));
  return (
    <Flex vertical className="gap-4 px-10">
      <Input placeholder="Tiêu đề" />
      <TextArea variant="outlined" placeholder="Description" rows={4} />
      <div>
        <Typography.Title className="!p-0 !m-0" level={3}>
          Content
        </Typography.Title>
        <Typography.Text type="secondary">
          Title, short description, image...
        </Typography.Text>
      </div>
      <MarkdownEditor
        placeholder="Type your content here..."
        value={content}
        onChange={handleEditorChange} // Update shared content
      />
      <div>
        <Typography.Title className="!p-0 !m-0" level={3}>
          Properties
        </Typography.Title>
        <Typography.Text type="secondary">
          Additional functions and attributes...
        </Typography.Text>
      </div>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Gắn thẻ bài viết"
        onChange={() => {}}
        options={options}
      />
      <Input placeholder="Meta title" />
      <TextArea variant="outlined" placeholder="Meta description" rows={4} />
      <Flex justify="space-between" align="center" className="gap-4">
        <div />
        <div className="flex gap-4">
          <Button>Preview</Button>
          <Button onClick={handleSubmit} type="primary">
            Submit
          </Button>
        </div>
      </Flex>

      {/* <div className="aie-container [&_img]:inline-block">
        <div
          className="aie-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div> */}
    </Flex>
  );
};

export default NewPost;
