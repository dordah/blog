import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { UserContextProps } from "../typings/userContext";
import { PostProps } from "../typings/post";
import {
  HeaderWrapper,
  TimeWrapper,
  AuthorWrapper,
  EditWrapper,
  EditButton,
  IconWrapper,
  ImageWrapper,
  ContentWrapper,
} from "../styles/post";

const Post: FC = () => {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const { userInfo } = useContext<UserContextProps>(UserContext);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const postInfo = await response.json();
      setPostInfo(postInfo);
    })();
  }, []);

  return (
    <div>
      {postInfo && (
        <>
          <HeaderWrapper>{postInfo.title}</HeaderWrapper>
          <TimeWrapper>
            {formatISO9075(new Date(postInfo.createdAt))}
          </TimeWrapper>
          <AuthorWrapper>by {postInfo.author.username}</AuthorWrapper>
          {userInfo.id === postInfo.author._id && (
            <EditWrapper>
              <EditButton to={`/edit/${postInfo._id}`}>
                <IconWrapper
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </IconWrapper>
                Edit Post
              </EditButton>
            </EditWrapper>
          )}
          <ImageWrapper
            src={`http://localhost:4000/${postInfo.cover}`}
            alt=""
          />
          <ContentWrapper
            dangerouslySetInnerHTML={{ __html: postInfo.content }}
          />
        </>
      )}
    </div>
  );
};

export default Post;
