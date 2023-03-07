import React from "react";

const Loading = ({ center }: { center: boolean }) => {
  return <div className={center ? "loading loading-center" : "loading"}></div>;
};

export default Loading;
