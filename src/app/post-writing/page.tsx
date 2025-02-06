
import dynamic from "next/dynamic";
const NewPost = dynamic(() => import("@/components/pages/blogs/NewPost"), { ssr: false });

export default function PostWriting() {
  return (
    <NewPost />
  );
}
