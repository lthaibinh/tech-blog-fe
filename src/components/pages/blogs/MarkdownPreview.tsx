import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Dynamically import the Markdown previewer to avoid SSR issues
const MarkdownPreview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

const BlogPost = ({ post }: any) => {
  const [content, setContent] = useState(post.content);

  useEffect(() => {
    // Example: Fetch content dynamically if needed
    setContent(post.content || "No content available.");
  }, [post]);

  return (
    <div>
      <h1>{post.title}</h1>
      <MarkdownPreview source={content} />
    </div>
  );
};

export default BlogPost;
