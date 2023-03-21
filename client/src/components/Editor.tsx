import { FC } from "react";
import ReactQuill from "react-quill";
import { EditorProps } from "../typings/editor";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  return (
    <ReactQuill
      value={value}
      theme={"snow"}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
