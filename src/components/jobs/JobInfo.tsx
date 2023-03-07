import React from "react";
import { ReactElement } from "react";
import Wrapper from "./JobInfo.styled";

type IProps = {
  icon: ReactElement;
  text: string;
};

const JobInfo: React.FC<IProps> = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
