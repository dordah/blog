import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../UserContext";
import { UserContextProps } from "../typings/userContext";
import { PostProps } from "../typings/post";
import SVG from "../utils/SVG";
import { iconsDataPath, LIKED_COLOER, DEFAULE_FILL_COLOR } from "../consts";
import {
  HeaderWrapper,
  TimeWrapper,
  AuthorWrapper,
  EditWrapper,
  EditButton,
  ImageWrapper,
  ContentWrapper,
} from "../styles/post";

const Post: FC = () => {
  const [postInfo, setPostInfo] = useState<PostProps | null>(null);
  const { userInfo } = useContext<UserContextProps>(UserContext);
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:4000/post/${id}`);
      const postInfo = await response.json();
      setPostInfo(postInfo);
      setIsLiked(postInfo.likes?.includes(userInfo?.id) ?? false);
    })();
  }, []);

  const handleLikeClick = async () => {
    if (!userInfo) {
      return;
    }

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);

    try {
      await fetch(`http://localhost:4000/post/${id}/like`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLiked: newIsLiked }),
      });
      setPostInfo((prevState) => {
        if (!prevState) return null;
        const newLikes = newIsLiked
          ? [...(prevState.likes || []), userInfo.id]
          : (prevState.likes || []).filter((id) => id !== userInfo.id);
        return {
          ...prevState,
          likes: newLikes,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {postInfo && (
        <>
          <HeaderWrapper>{postInfo.title}</HeaderWrapper>
          <TimeWrapper>
            {formatISO9075(new Date(postInfo.createdAt))}
          </TimeWrapper>
          <AuthorWrapper>by {postInfo.author.username}</AuthorWrapper>
          {userInfo?.id === postInfo.author._id && (
            <EditWrapper>
              <EditButton to={`/edit/${postInfo._id}`}>
                <SVG>
                  <path d={iconsDataPath.edit} />
                </SVG>
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
          <div>
            <SVG
              onClick={handleLikeClick}
              fill={isLiked ? LIKED_COLOER : DEFAULE_FILL_COLOR}
            >
              <path d={iconsDataPath.like} />
            </SVG>
            {postInfo.likes?.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
