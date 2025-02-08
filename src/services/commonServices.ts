import { IUserProfile } from "@/types";
import { IUploadFile } from "@/types/api";
import { ICreationUploadFileReq } from "@/types/request";
import { axiosObservable } from "@/utils/axiosObservable";

export const uploadFileService = (body: ICreationUploadFileReq) => {
  const formData: any = new FormData();
  formData.append("file", body.file);
  formData.append("metaData", JSON.stringify(body.metaData));
  return axiosObservable<IUploadFile>({
    method: "post",
    url: "/file-service/files",
    data: formData,
  });
};

export const getAllUser = () => {
  return axiosObservable<IUserProfile[]>({
    method: "get",
    url: `/profile/users/all`,
  });
}
