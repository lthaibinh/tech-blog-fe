"use client";
import { Button, Form, Upload, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { FC } from "react";
import { lastValueFrom } from "rxjs";
import { uploadFileService } from "@/services/commonServices";
import { IUploadFile } from "@/types/api";

interface IProps {
  onUploadFileChange: (thumbnailUrl: string) => void;
}
export const UploadFileInput: FC<IProps> = ({
  onUploadFileChange,
  ...rest
}) => {
  const customRequest = async ({
    file,
    onSuccess,
    onError,
  }: {
    file: UploadFile;
    onSuccess: Function;
    onError: Function;
  }) => {
    // Add metaData (for example, you can send some custom fields)
    const metaData = {
      userId: 123,
      description: "Sample file upload",
    };

    // Make the upload request using fetch, axios, etc.
    try {
      // Replace URL with your backend API endpoint
      const response = await lastValueFrom(
        uploadFileService({
          metaData: metaData,
          file: file,
        })
      );

      if (response) {
        onUploadFileChange(response.url);
        onSuccess(null, file);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      onError(error);
      alert("Upload failed");
    }
  };
  return (
    <Upload
      accept="image/*"
      listType="picture"
      defaultFileList={[]}
      multiple={false}
      customRequest={customRequest as any}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        Upload
      </Button>
    </Upload>
  );
};
