import { getCommentsByPostId } from "@/services/blogServies";
import { Avatar, Divider, Flex } from "antd";
import { format } from "date-fns";
import { lastValueFrom } from "rxjs";
import { ChildComment } from "./ChildComment";
import { IPagableRes } from "@/types/api";

interface Iprops {
  postId: number;
}
export const ParentComment: React.FC<Iprops> = async (props) => {
  const { postId } = props;
  const pageableComments = await lastValueFrom(getCommentsByPostId(postId)).catch(
    (err) => {
      console.log("binhtest err", err);
      const res: IPagableRes<any[]> = {
        page: 0,
        size: 0,
        last: true,
        totalData: 0,
        data: [],
      }
      return res
    }
  );
  const comments = pageableComments.data;

  console.log("binhtest comments", comments);
  return (
    <>
      {comments?.map((comment) => {
        const formatedUpdatedDate = format(
          new Date(comment.createdAt),
          "dd-MM-yyyy HH:mm:ss"
        );
        return (
          <>
            <Flex className="gap-2">
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
            <ChildComment parentId={comment.id} postId={postId} />
            <Divider />
          </>
        );
      })}
    </>
  );
};
