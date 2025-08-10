import { IUserProfile } from ".";

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
  updatedDate: Date;
  userProfile: IUserProfile;
  thumbnailUrl: string;
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

export interface IComments {
  id: number;
  userId: number;
  parentId: number;
  content: string;
  createdAt: Date;
  userProfile: {
    id: number;
    username: string;
    fullname: string;
    bio: string;
    email: string;
    dob: Date;
    city: string;
    avatarUrl: string;
  };
}

export interface IPagableRes<T> {
  page: number;
  size: number;
  totalData: number;
  last: boolean;
  data: T;
}

export interface IUploadFile {
  id: number;
  metaData: string;
  url: string;
  type: string;
  createdAt: Date;
}
