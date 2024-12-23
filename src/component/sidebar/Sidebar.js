import React from "react";
import "./sidebar.css";
import logo from "../../assets/images/logo-sneaker.png";
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { Link } from "react-router-dom";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const activeItem = sidebar_items.findIndex(
    (item) => item.route === props.location.pathname ||
      item.add === props.location.pathname ||
      item.modify === props.location.pathname.substring(0, props.location.pathname.lastIndexOf("/") ||
        item.sub === props.location.pathname.substring(0, props.location.pathname.lastIndexOf("/")))
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        <img src={logo} alt="store logo" />
      </div>
      {sidebar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          ></SidebarItem>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
