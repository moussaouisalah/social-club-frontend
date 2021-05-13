import React from "react";
import "./sidebar-item.css";

type SidebarItemProps = {
  logo?: string;
  text: string;
  isSelected?: boolean;
};

const SidebarItem = ({
  logo = "",
  text,
  isSelected = false,
}: SidebarItemProps) => {
  return (
    <div className={isSelected ? "sidebar-item selected" : "sidebar-item"}>
      <img className="sidebar-item-logo" src={logo}></img>
      <div className="sidebar-item-text">{text}</div>
    </div>
  );
};

export default SidebarItem;
