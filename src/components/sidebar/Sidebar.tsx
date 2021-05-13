import React from "react";
import "./sidebar.css";

type SidebarProps = {
  children?: React.ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  return <div className="sidebar">{children}</div>;
};

export default Sidebar;
