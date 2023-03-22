import { FC } from "react";
import ReactQuill from "react-quill";
import { EditorProps } from "../typings/editor";
import { modules, formats } from "../consts";

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
