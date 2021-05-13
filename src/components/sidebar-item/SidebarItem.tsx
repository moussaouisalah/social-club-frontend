import React from "react";
import "./sidebar-item.css";
import transparentImage from "../../assets/transparent.png";

type SidebarItemProps = {
  logo?: string;
  text: string;
  isSelected?: boolean;
  color?: string;
  onClick?: () => void;
};

const makeStyles = (color: string) => ({
  isSelected: {
    borderLeft: "8px solid " + color,
    padding: "5px 10px 5px 42px",
  } as React.CSSProperties,
  notSelected: {
    cursor: "pointer",
    "&:hover": {
      borderLeft: "3px solid " + color,
      padding: "5px 10px 5px 47px",
    },
  } as React.CSSProperties,
  logo: {
    backgroundColor: color,
  } as React.CSSProperties,
  text: {
    color,
  } as React.CSSProperties,
});

const SidebarItem = ({
  logo = transparentImage,
  text,
  isSelected = false,
  color = "#727272",
  onClick,
}: SidebarItemProps) => {
  const styles = makeStyles(color);
  return (
    <div
      className={"sidebar-item"}
      style={isSelected ? styles.isSelected : styles.notSelected}
      onClick={onClick}
    >
      <img
        className="sidebar-item-logo"
        src={logo}
        style={styles.logo}
        alt="logo"
      />
      <div className="sidebar-item-text" style={styles.text}>
        {text}
      </div>
    </div>
  );
};

export default SidebarItem;
