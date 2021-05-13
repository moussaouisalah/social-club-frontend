import React from "react";
import "./sidebar-title.css";

type SidebarTitleProps = {
  title: string;
};

const SidebarTitle = ({ title }: SidebarTitleProps) => {
  return <div className="sidebar-title">{title}</div>;
};

export default SidebarTitle;
