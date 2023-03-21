import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import {
  CreateFormWrapper,
  InputWrapper,
  ButtonWrapper,
} from "../styles/global";
import { FormDataProps } from "../typings/formData";

const CreatePost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  const createNewPost = async (
    ev: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    const data = new FormData();
    const formFields: FormDataProps = { title, summary, content };
    for (const [key, value] of Object.entries(formFields)) {
      data.set(key, value);
    }

    file && data.append("file", file);

    ev.preventDefault();
    const res = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include",
    });

    res.ok && setRedirect(true);
  };

  return redirect ? (
    <Navigate to={"/"} />
  ) : (
    <CreateFormWrapper onSubmit={createNewPost}>
      <InputWrapper
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <InputWrapper
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <InputWrapper
        type="file"
        onChange={(ev) => setFile(ev.target.files?.[0] || null)}
      />
      <Editor onChange={setContent} value={content} />
      <ButtonWrapper>Create Post</ButtonWrapper>
    </CreateFormWrapper>
  );
};

export default CreatePost;
