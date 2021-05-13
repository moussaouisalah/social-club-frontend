import React from "react";
import "./content.css";

type ContentProps = {
  children?: React.ReactNode;
};

const Content = ({ children }: ContentProps) => {
  return <div className="profile-content">{children}</div>;
};

export default Content;
