import React, { useEffect } from "react";
import "./sidebar.css";
// import logo from "../../assets/images/logo-sneaker.png";
import { Link, useLocation } from "react-router-dom";

const sidebar_items_1 = [
  {
    "display_name": "Dashboard",
    "route": "/admin/dashboard",
    "icon": "bx bx-category-alt"
  },
  {
    "display_name": "Tài khoản",
    "route": "/admin/accounts",
    "add": "/add-account",
    "modify": "/account-detail",
    "icon": "bx bx-user-pin"
  },
  {
    "display_name": "Sản phẩm",
    "route": "/admin/products",
    "add": "/add-product",
    "modify": "/product-detail",
    "icon": "bx bx-package"
  },
  {
    "display_name": "Đơn hàng",
    "route": "/admin/orders",
    "add": "/add-order",
    "modify": "/order-detail",
    "sub": "/detail-order",
    "icon": "bx bx-cart"
  },
  {
    "display_name": "Voucher",
    "route": "/admin/vouchers",
    "add": "/add-voucher",
    "modify": "/voucher-detail",
    "icon": "bx bx-bar-chart-alt"
  },
  {
    "display_name": "Loại sản phẩm",
    "route": "/admin/categories",
    "add": "/add-category",
    "modify": "/category-detail",
    "icon": "bx bx-list-ol"
  },
  {
    "display_name": "Khuyến mãi",
    "route": "/admin/sale",
    "add": "/add-sale",
    "modify": "/sale-detail",
    "icon": "bx bx-gift"
  },
  {
    "display_name": "Thương hiệu",
    "route": "/admin/brand",
    "add": "/add-brand",
    "modify": "/brand-detail",
    "icon": "bx bx-store-alt"
  },
  {
    "display_name": "Hộp thoại",
    "route": "/admin/chat",
    "add": "/chat",
    "modify": "/chat",
    "icon": "bx bx-user-pin"
  }
]

const sidebar_items_2 = [
  {
    "display_name": "Đơn hàng",
    "route": "/admin/orders",
    "add": "/add-order",
    "modify": "/order-detail",
    "sub": "/detail-order",
    "icon": "bx bx-cart"
  },
  {
    "display_name": "Hộp thoại",
    "route": "/admin/chat",
    "add": "/chat",
    "modify": "/chat",
    "icon": "bx bx-user-pin"
  }
]
const SidebarItem = ({ title, icon, active }) => {
  const activeClass = active ? "active" : "";
  return (
    <div className="sidebar__item">
      <div className={`sidebar__item-inner ${activeClass}`}>
        <i className={icon}></i>
        <span>{title}</span>
      </div>
    </div>
  );
};

const Sidebar = (props) => {
  const location = useLocation(); // Lấy đối tượng location
  const sidebar_items = props.user.roleName === "ADMIN" ? sidebar_items_1 : sidebar_items_2;

  useEffect(() => {
    console.log(props.user);
  }, []);

  const activeItem = sidebar_items.findIndex(
    (item) =>
      item.route === location.pathname ||
      item.add === location.pathname ||
      item.modify === location.pathname.substring(0, location.pathname.lastIndexOf("/")) ||
      item.sub === location.pathname.substring(0, location.pathname.lastIndexOf("/"))
  );

  return (
    <div className="sidebar">
      <div className="sidebar__logo">
        {/* <img src={logo} alt="store logo" /> */}
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
