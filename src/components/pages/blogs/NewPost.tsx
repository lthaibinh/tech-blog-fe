import { useMemo, useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import { Button, Flex, Input, Select, SelectProps } from "antd";
import { CheckOutlined } from "@ant-design/icons";


// import MarkdownEditor from "./MarkdownEditor";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  // const [preview, setPreview] = useState("");
  const handleSubmit = async () => {
    console.log("binhtest content:", {content});
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
    <Flex vertical className="gap-4">
      <Input placeholder="Tiêu đề" />
      <Flex className="gap-4">
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Gắn thẻ bài viết"
          onChange={() => {}}
          options={options}
        />
        <Button onClick={handleSubmit} type="primary" icon={<CheckOutlined />}>
          Submit
        </Button>
      </Flex>
      <MarkdownEditor
        placeholder="Type your content here..."
        value={content}
        onChange={handleEditorChange} // Update shared content
      />
      {/* Preview */}
      {/* <div className="w-1/2 p-4">
        <MarkdownPreview content={content} />
      </div> */}
      <div className="aie-container [&_img]:inline-block">
        <div
          className="aie-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </Flex>
  );
};

export default NewPost;
