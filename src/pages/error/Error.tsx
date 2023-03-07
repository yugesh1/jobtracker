import React from "react";
import Wrapper from "./ErrorPage.styled";
import img from "../../assets/images/not-found.svg";
import { Link } from "react-router-dom";
const Error: React.FC = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>ohh page not found</h3>
        <p>There is some issue in page loading</p>
        <Link to="/">Back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
