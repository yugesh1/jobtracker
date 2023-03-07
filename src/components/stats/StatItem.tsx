import React, { ReactElement } from "react";
import Wrapper from "./StatItem.styled";

interface IProps {
  count: number;
  title: string;
  icon: ReactElement;
  color: string;
  bcg: string;
}

const StatItem = ({ count, title, icon, color, bcg }: IProps) => {
  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <span className="icon">{icon}</span>
      </header>
      <h5>{title}</h5>
    </Wrapper>
  );
};

export default StatItem;
