import React from "react";
import { formatISO9075 } from "date-fns";
import { PostProps } from "../typings/post";
import {
  CardWrapper,
  ImageWrapper,
  LinkWrapper,
  TitleHeader,
  InfoWrapper,
  AuthorWrapper,
  SummaryWrapper,
} from "../typings/postCard";

const PostCard: React.FC<PostProps> = ({
  _id,
  title,
  author,
  summary,
  content,
  cover,
  createdAt,
}) => {
  return (
    <CardWrapper>
      <LinkWrapper to={`/post/${_id}`}>
        <ImageWrapper src={`http://localhost:4000/${cover}`} alt="" />
      </LinkWrapper>
      <div>
        <LinkWrapper to={`/post/${_id}`}>
          <TitleHeader>{title}</TitleHeader>
        </LinkWrapper>
        <InfoWrapper>
          <AuthorWrapper>{author.username}</AuthorWrapper>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </InfoWrapper>
        <SummaryWrapper>{summary}</SummaryWrapper>
      </div>
    </CardWrapper>
  );
};

export default PostCard;
