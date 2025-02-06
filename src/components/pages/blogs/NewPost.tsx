"use client"; 
import { useEffect, useState } from "react";
import { MarkdownEditor } from "./MarkdownEditor";
import {
  Button,
  Flex,
  Form,
  FormProps,
  Input,
  Select,
  SelectProps,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { createNewPost, getAllMeta } from "@/services/blogServies";

type FieldType = {
  title?: string;
  description?: string;
  content?: string;
  metaDescription?: string;
  metaTitle: string;
  metaIds: number[];
};
const NewPost = () => {
  const [form] = Form.useForm();

  const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [preview, setPreview] = useState("");
  const handleSubmit = async () => {
    // console.log("binhtest content:", { content });
  };

  const handleEditorChange = (value: string) => {
    //  setContent(value);
    form.setFieldsValue({ content: value });
  };
  const [options, setOptions] = useState<SelectProps["options"]>([]);
  // const options: SelectProps["options"] = new Array(10)
  //   .fill(0)
  //   .map((_, index) => ({
  //     label: `Option ${index + 1}`,
  //     value: `opt${index + 1}`,
  //   }));
  useEffect(() => {
    getAllMeta().subscribe({
      next: (res) => {
        console.log("binhtet res", res);
        setOptions(res);
      },
      error: (err) => {
        console.log("err", err);
      },
    });
  }, []);
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    createNewPost(values).subscribe({
      next: (res) => {
        console.log("binhtet res", res);
        setOptions(res);
      },
      error: (err) => {
        console.log("err", err);
      },
    });
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  const contentValue = Form.useWatch("content", form);

  return (
    <Form
      name="basic"
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      form={form}
      className="px-10"
      // style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Tiêu đề"
        name="title"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Tiêu đề" />
      </Form.Item>
      <Form.Item<FieldType>
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <TextArea variant="outlined" placeholder="Description" rows={4} />
      </Form.Item>
      <div>
        <Typography.Title className="!p-0 !m-0" level={3}>
          Content
        </Typography.Title>
        <Typography.Text type="secondary">
          Title, short description, image...
        </Typography.Text>
      </div>
      <Form.Item<FieldType>
        // label="Description"
        name="content"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <MarkdownEditor
          placeholder="Type your content here..."
          value={contentValue}
          onChange={handleEditorChange} // Update shared content
        />
      </Form.Item>

      <div>
        <Typography.Title className="!p-0 !m-0" level={3}>
          Properties
        </Typography.Title>
        <Typography.Text type="secondary">
          Additional functions and attributes...
        </Typography.Text>
      </div>
      <Form.Item<FieldType>
        // label="Description"
        name="metaIds"
        rules={[{ required: true, message: "Chọn Meta" }]}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Gắn thẻ bài viết"
          options={options}
          fieldNames={{ // ánh xạ options vs antd
            label: "value",
            value: "id",
          }}
        />
      </Form.Item>

      <Form.Item<FieldType>
        label="Meta title"
        name="metaTitle"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Meta title" />
      </Form.Item>

      <Form.Item<FieldType>
        label="meta Description"
        name="metaDescription"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <TextArea variant="outlined" placeholder="Meta description" rows={4} />
      </Form.Item>

      <Flex justify="space-between" align="center" className="gap-4">
        <div />
        <div className="flex gap-4">
          <Button>Preview</Button>
          <Button type="primary" htmlType="submit">
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
    </Form>
  );
};

export default NewPost;
