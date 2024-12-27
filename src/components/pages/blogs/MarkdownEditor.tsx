import dynamic from "next/dynamic";
import { useState } from "react";

// Dynamically import the Markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const MarkdownEditor = ({ initialValue = "", onChange }: any) => {
  const [value, setValue] = useState(initialValue);

  const handleEditorChange = (newValue: any) => {
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  return (
    <div data-color-mode="light">
      <MDEditor value={value} onChange={handleEditorChange} />
    </div>
  );
};

export default MarkdownEditor;
