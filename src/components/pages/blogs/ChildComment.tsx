import {
  getCommentsByParentid,
  getCommentsByPostId,
} from "@/services/blogServies";
import { IPagableRes } from "@/types/api";
import { Avatar, Flex } from "antd";
import { format } from "date-fns";
import { lastValueFrom } from "rxjs";

interface Iprops {
  parentId: number;
  postId: number;
}
export const ChildComment: React.FC<Iprops> = async (props) => {
  const { parentId, postId } = props;
  const pageableComments = await lastValueFrom(
    getCommentsByParentid({ parentId, postId })
  ).catch((err) => {
    const res: IPagableRes<any[]> = {
      page: 0,
      size: 0,
      last: true,
      totalData: 0,
      data: [],
    };
    return res;
  });
  const comments = pageableComments.data;
  console.log("binhtest comments", comments);
  return (
    <div className="ml-12 flex flex-col gap-4">
      {comments?.map((comment) => {
        const formatedUpdatedDate = format(
          new Date(comment.createdAt),
          "dd-MM-yyyy HH:mm:ss"
        );
        return (
          <Flex key={comment.id} className="gap-2">
            <Avatar size={48} src={comment.userProfile.avatarUrl} />
            <Flex vertical>
              <Flex vertical justify="space-evenly" className="h-12">
                <p className="font-bold">{comment.userProfile.fullname}</p>
                <p className="text-gray-700">{formatedUpdatedDate}</p>
              </Flex>
              <div className="mt-1">
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </div>
            </Flex>
          </Flex>
        );
      })}
    </div>
  );
};
