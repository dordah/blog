import { FC } from "react";
import styled from "styled-components";
import {
  DEFAULT_ICON_SIZE,
  DEFAULT_VIEW_BOX_SIZE,
  DEFAULT_STROKE_WIDTH,
  DEFAULE_STROKE_COLOR,
  DEFAULE_FILL_COLOR,
} from "../consts";

interface SVGProps {
  className?: string;
  onClick?: () => void;
  fill?: string;
  strokeWidth?: number;
  stroke?: string;
  viewBox?: string;
  children: React.ReactNode;
  height?: string;
}

const SVGWrapper = styled.svg<SVGProps>`
  height: ${(props) => props.height || DEFAULT_ICON_SIZE};
`;

const SVG: FC<SVGProps> = ({
  className,
  onClick,
  fill = DEFAULE_FILL_COLOR,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  stroke = DEFAULE_STROKE_COLOR,
  viewBox = DEFAULT_VIEW_BOX_SIZE,
  children,
  height,
}) => {
  return (
    <SVGWrapper
      className={className}
      onClick={onClick}
      fill={fill}
      strokeWidth={strokeWidth}
      stroke={stroke}
      viewBox={viewBox}
      height={height}
    >
      {children}
    </SVGWrapper>
  );
};

export default SVG;
