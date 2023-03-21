import styled from "styled-components";
import { Link } from "react-router-dom";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 50px;
  align-items: center;
`;

export const LogoWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
  font-size: 1.8rem;
`;

export const NavBar = styled.nav`
  display: flex;
  gap: 15px;
`;

export const LinkWrapper = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

export const AnchorWrapper = styled.a`
  cursor: pointer;
`;
