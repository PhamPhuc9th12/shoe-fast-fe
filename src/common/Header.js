import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "../static/css/style.css"
import "../assets/boxicons-2.0.7/css"
const Header = (props) =>{
    return(
        <div className="mini-card">
        <nav className="navbar navbar-expand-md col-12">
          <div className="navbar-brand ml-1 col">
            {/* <img src={logo} width={50} height={50} alt="logo" /> */}
          </div>
          <div className="collapse navbar-collapse col">
            <ul className="navbar-nav mini-ul">
              <li
                className={`nav-item mr-2 mini-item ${
                  props.header === 1 ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/" exact>
                  Trang chủ
                </NavLink>
              </li>
              <li
                className={`nav-item mr-2 mini-item ${
                  props.header === 2 ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/store" exact>
                  Sản phẩm
                </NavLink>
              </li>
              <li
                className={`nav-item mr-2 mini-item ${
                  props.header === 3 ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/cart" exact>
                  Giỏ hàng
                </NavLink>
              </li>
              {props.user && (
                <li
                  className={`nav-item mr-2 mini-item ${
                    props.header === 5 ? "active" : ""
                  }`}
                >
                  <NavLink className="nav-link" to="/order" exact>
                    Đơn hàng
                  </NavLink>
                </li>
              )}
              <li
                className={`nav-item mr-2 mini-item ${
                  props.header === 4 ? "active" : ""
                }`}
              >
                <NavLink className="nav-link" to="/blog" exact>
                  Chính sách
                </NavLink>
              </li>
              {props.user && (
                <li
                  className={`nav-item mr-2 mini-item ${
                    props.header === 6 ? "active" : ""
                  }`}
                >
                  <NavLink className="nav-link" to="/chat" exact>
                    Hỏi đáp
                  </NavLink>
                </li>
              )}
            </ul>
            {/* onSubmit={submitHandler} */}
            <form className="form-inline d-flex my-2 my-lg-0 mr-3" > 
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
            {/* <Dropdown
              customToggle={() => renderUserToggle(curr_user)}
              contentData={props.user ? user_menu : not_menu}
              renderItems={(item, index) => renderUserMenu(item, index)}
            /> */}
          </div>
        </nav>
      </div> 
    )
}
export default Header;