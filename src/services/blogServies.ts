import { IBlogResponse } from "@/types/api";
import { axiosInstance } from "@/utils/axios";
import { axiosObservable } from "@/utils/axiosObservable";

export const getAllBlogPost = () => {
  return axiosObservable<IBlogResponse[]>({ method: "get", url: "/post/posts" });
};
