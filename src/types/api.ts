export interface IBlogResponse {
  id: number;
  userId: number;
  title: string;
  description: string;
  content: string;
  metas: {
    id: number;
    key: string;
    value: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}
export interface IUploadFileRes {
  status: number;
  message: string;
  data: {
    id: number;
    metaData: string;
    url: string;
    type: string;
    createdAt: string;
  };
}
export interface IMetaRes {
  id: number;
  key: string;
  value: string;
}
