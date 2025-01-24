export interface IBlog {
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
