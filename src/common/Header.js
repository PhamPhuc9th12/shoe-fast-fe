
import React from "react";
import "../static/css/style.css";
import logo from "../static/images/nike.jpg";
import { NavLink, useHistory } from "react-router-dom";
import user_image from "../static/images/puma.jpg";
import Dropdown from "../component/admin/dropdown/Dropdown";
import { toast } from "react-toastify";

const user_menu = [
  {
    icon: "bx bx-user",
    content: "Tài khoản",
    url: "/profile",
  },
  {
    icon: "bx bx-log-out-circle bx-rotate-180",
    content: "Đăng xuất",
    url: "/",
  },
];

const not_menu = [
  {
    icon: "bx bx-user",
    content: "Đăng nhập",
    url: "/sign-in",
  },
  {
    icon: "bx bx-cog",
    content: "Đăng kí",
    url: "/register",
  },
];

const Header = (props) => {
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.keyword.value.trim();
    if (keyword) {
      props.searchHandler(keyword);
      history.push("/search-page");
    }
  };

  const curr_user = {
    display_name: props.user ? props.user.fullName : "Tài khoản",
    image: user_image,
  };

  const renderUserToggle = (user) => (
    <div className="topnav__right-user">
      <div className="topnav__right-user__image">
        <img style={{ width: "50px" }} src={user.image} alt="user avatar" />
      </div>
      <div className="topnav__right-user__name">{user.display_name}</div>
    </div>
  );

  const renderUserMenu = (item, index) => (
    <NavLink
      to={item.url}
      key={index}
      exact
      onClick={item.url === "/" ? signOutHandler : null}
    >
      <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
      </div>
    </NavLink>
  );

  const signOutHandler = () => {
    props.refresh(false);
    toast.success("Tài khoản đã được đăng xuất.");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    props.userHandler(null);
  };

  return (
    <div className="mini-card">
      <nav className="navbar navbar-expand-md col-12">
        <div className="navbar-brand ml-1 col">
          <img src={logo} width={50} height={50} alt="logo" />
        </div>
        <div className="collapse navbar-collapse col">
          <ul className="navbar-nav mini-ul">
            <li
              className={`nav-item mr-2 mini-item ${props.header === 1 ? "active" : ""
                }`}
            >
              <NavLink className="nav-link" to="/" exact>
                Trang chủ
              </NavLink>
            </li>
            <li
              className={`nav-item mr-2 mini-item ${props.header === 2 ? "active" : ""
                }`}
            >
              <NavLink className="nav-link" to="/store" exact>
                Sản phẩm
              </NavLink>
            </li>
            <li
              className={`nav-item mr-2 mini-item ${props.header === 3 ? "active" : ""
                }`}
            >
              <NavLink className="nav-link" to="/cart" exact>
                Giỏ hàng
              </NavLink>
            </li>
            {props.user && (
              <li
                className={`nav-item mr-2 mini-item ${props.header === 5 ? "active" : ""
                  }`}
              >
                <NavLink className="nav-link" to="/order" exact>
                  Đơn hàng
                </NavLink>
              </li>
            )}
            <li
              className={`nav-item mr-2 mini-item ${props.header === 4 ? "active" : ""
                }`}
            >
              <NavLink className="nav-link" to="/blog" exact>
                Chính sách
              </NavLink>
            </li>
            {props.user && (
              <li
                className={`nav-item mr-2 mini-item ${props.header === 6 ? "active" : ""
                  }`}
              >
                <NavLink className="nav-link" to="/chat" exact>
                  Hỏi đáp
                </NavLink>
              </li>
            )}
          </ul>
          <form className="form-inline d-flex my-2 my-lg-0 mr-3" onSubmit={submitHandler}>
            <input
              className="form-control mr-sm-2"
              type="search"
              aria-label="Search"
              name="keyword"
            />
            <button type="submit">
              <i
                className="fa fa-search ml-1"
                aria-hidden="true"
                style={{ fontSize: "12px" }}
              ></i>
            </button>
          </form>
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={props.user ? user_menu : not_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
      </nav>
    </div>
  );
};

export default Header;
