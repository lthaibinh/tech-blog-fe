import { IBlogResponse, IMetaRes } from "@/types/api";
import { axiosInstance } from "@/utils/axios";
import { axiosObservable } from "@/utils/axiosObservable";

export const getAllBlogPost = () => {
  return axiosObservable<IBlogResponse[]>({ method: "get", url: "/post/posts" });
};

export const getAllMeta = () => {
  return axiosObservable<IMetaRes[]>({ method: "get", url: "/post/meta" });
}