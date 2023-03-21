import { FC, useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import {
  CreateFormWrapper,
  InputWrapper,
  ButtonWrapper,
} from "../styles/global";
import { FormDataProps } from "../typings/formData";

const EditPost: FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const postInfo = await response.json();
      setTitle(postInfo.title);
      setContent(postInfo.content);
      setSummary(postInfo.summary);
    })();
  }, []);

  const upadatePost = async (
    ev: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    ev.preventDefault();
    const data = new FormData();

    const formFields: FormDataProps = { id, title, summary, content };
    for (const [key, value] of Object.entries(formFields)) {
      data.set(key, value);
    }

    file && data.append("file", file);

    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include",
    });

    if (response.ok) setRedirect(true);
  };

  return redirect ? (
    <Navigate to={`/post/${id}`} />
  ) : (
    <CreateFormWrapper onSubmit={upadatePost}>
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
      <ButtonWrapper>Update Post</ButtonWrapper>
    </CreateFormWrapper>
  );
};

export default EditPost;
