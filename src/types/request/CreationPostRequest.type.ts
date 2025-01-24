export interface CreationPostRequest {
    title?: string;
    description?: string;
    content?: string;
    metaDescription?: string;
    metaTitle: string;
    metaIds: number[];
}