import styled from "styled-components";
import { Link } from "react-router-dom";

export const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 30px;

  @media screen and (min-width: 600px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
`;

export const ImageWrapper = styled.img`
  max-width: 100%;
  height: auto;
`;

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const TitleHeader = styled.h2`
  margin: 0;
  font-size: 1.4rem;
`;

export const InfoWrapper = styled.p`
  margin: 5px 0;
  color: #888;
  font-size: 0.7rem;
  font-weight: bold;
  display: flex;
  gap: 10px;
`;

export const AuthorWrapper = styled.a`
  color: #333;
`;

export const SummaryWrapper = styled.p`
  margin: 10px 0;
  line-height: 1.4rem;
`;
