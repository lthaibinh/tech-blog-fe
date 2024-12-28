// Editor Component
import { AiEditor, AiEditorOptions } from "aieditor";
import "aieditor/dist/style.css";

import { useState, useEffect, useRef } from "react";

// Editor and Preview Container
export const MarkdownPreview = ({ content }: { content: string }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const aiEditorRef = useRef<AiEditor | null>(null);

  useEffect(() => {
    if (!divRef.current) return;

    if (!aiEditorRef.current) {
      const aiEditor = new AiEditor({
        element: divRef.current,
        toolbarKeys: [], // Disable toolbar for preview
      });

      aiEditorRef.current = aiEditor;
    }

    return () => {
      aiEditorRef.current?.destroy();
      aiEditorRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (aiEditorRef.current && content !== aiEditorRef.current.getMarkdown()) {
      aiEditorRef.current.setContent(content || "");
    }
  }, [content]);

  return <div className="h-[calc(100vh-200px)]" ref={divRef} />;
};