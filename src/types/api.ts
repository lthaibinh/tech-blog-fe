export interface IBlogResponse {
    "id": number,
    "title": string
    "content": string
    "author": string
}
export interface IUploadFileRes {
    status: number,
    message: string,
    data: {
        id: number,
        metaData: string,
        url: string,
        type: string,
        createdAt: string
    }
}