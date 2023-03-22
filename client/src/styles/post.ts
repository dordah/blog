import styled from "styled-components";
import { Link } from "react-router-dom";

export const ImageWrapper = styled.img`
  width: 100%;
  max-height: 300px;
  display: flex;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
  margin-bottom: 20px;
`;

export const HeaderWrapper = styled.h1`
  text-align: center;
  padding-bottom: 16px;
`;

export const TimeWrapper = styled.time`
  text-align: center;
  display: block;
  color: #aaa;
  font-size: 0.7rem;
`;

export const AuthorWrapper = styled.div`
  text-align: center;
  margin-bottom: 16px;
  font-size: 0.7rem;
  font-weight: bold;
`;

export const ContentWrapper = styled.div`
  line-height: 1.6rem;

  h1,
  h2 {
    margin-bottom: 20px;
  }

  h3,
  h4 {
    margin-bottom: 16px;
  }

  a {
    color: inherit;
  }
`;

export const EditWrapper = styled.div`
  text-align: center;
  margin-bottom: 16px;
`;

export const EditButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  background-color: #333;
  gap: 4px;
  color: #fff;
  padding: 12px 24px;
  border-radius: 4px;
  text-decoration: none;
`;

export const EditIconWrapper = styled.svg`
  height: 20px;
`;
