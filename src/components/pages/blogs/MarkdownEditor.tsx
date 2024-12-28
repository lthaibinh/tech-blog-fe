// "use client"; // Next.JS

import { FundViewOutlined } from "@ant-design/icons";
import { AiEditor, AiEditorOptions } from "aieditor";
import "aieditor/dist/style.css";

import { FC, HTMLAttributes, forwardRef, useEffect, useRef } from "react";

type AIEditorProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (val: string) => void;
  options?: Omit<AiEditorOptions, "element">;
};

export const MarkdownEditor: FC<AIEditorProps> = ({placeholder, defaultValue, value, onChange, options}) => {
    const divRef = useRef<HTMLDivElement>(null);
    const aiEditorRef = useRef<AiEditor | null>(null);

    useEffect(() => {
      if (!divRef.current) return;

      if (!aiEditorRef.current) {
        const aiEditor = new AiEditor({
          lang: "vi",
          toolbarSize: "medium",
          element: divRef.current,
          placeholder: placeholder,
          content: defaultValue,
          onChange: (ed) => {
            if (typeof onChange === "function") {
              onChange(ed.getMarkdown());
            }
          },
          toolbarKeys: [
            "undo",
            "redo",
            "brush",
            "eraser",
            "|",
            "heading",
            "font-family",
            "font-size",
            "|",
            "bold",
            "italic",
            "underline",
            "strike",
            "link",
            "code",
            "subscript",
            "superscript",
            "hr",
            "todo",
            "emoji",
            "|",
            "highlight",
            "font-color",
            "|",
            "align",
            "line-height",
            "|",
            "bullet-list",
            "ordered-list",
            "indent-decrease",
            "indent-increase",
            "break",
            "|",
            "image",
            "video",
            "attachment",
            "quote",
            "code-block",
            "table",
            "|",
            "source-code",
            "printer",
            "fullscreen",
            "ai",
            {
              html: `<div><svg style="width: 26px; height: 26px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M5.616 20q-.667 0-1.141-.475T4 18.386V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v12.77q0 .666-.475 1.14t-1.14.475zm0-1h12.769q.269 0 .442-.173t.173-.442V7H5v11.385q0 .269.173.442t.443.173M12 16q-1.627 0-2.932-.834Q7.763 14.333 7.096 13q.667-1.333 1.972-2.166Q10.373 10 12 10t2.932.834T16.904 13q-.667 1.333-1.972 2.166Q13.627 16 12 16m0-.885q1.189 0 2.214-.556T15.946 13q-.707-1.002-1.732-1.559T12 10.885t-2.214.556T8.055 13q.707 1.002 1.732 1.559t2.214.557m.005-1q.466 0 .788-.327q.323-.327.323-.793q0-.467-.327-.79q-.327-.321-.793-.321q-.467 0-.79.326q-.321.327-.321.793q0 .467.326.79q.327.322.793.322"/></svg></div>`,
              onClick: (event, editor) => {
                //Click Event
              },
              tip: "Xem trước",
            },
          ],

          ...options,
        });

        aiEditorRef.current = aiEditor;
      }

      return () => {
        if (aiEditorRef.current) {
          aiEditorRef.current.destroy();
          aiEditorRef.current = null;
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    

    useEffect(() => {
      console.log(value);
      if (aiEditorRef.current && value !== aiEditorRef.current.getMarkdown()) {
        aiEditorRef.current.setContent(value || "");
      }
    }, [value]);

    return <div className="h-[calc(100vh-200px)]" ref={divRef} />;
  }

