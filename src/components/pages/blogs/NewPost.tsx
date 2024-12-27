import { useState } from "react";
import MarkdownEditor from "./MarkdownEditor";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async () => {
   
  };

  return (
    <div>
      <h1>Create a New Blog Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}
      />
      <MarkdownEditor initialValue={content} onChange={setContent} />
      <button onClick={handleSubmit} style={{ marginTop: "1rem" }}>
        Submit
      </button>
    </div>
  );
};

export default NewPost;
