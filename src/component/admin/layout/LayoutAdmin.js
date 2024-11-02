import React from "react";
import Sidebar from "../sidebar/Sidebar";
// import TopNav from "../topnav/TopNav";
import { BrowserRouter as Router } from "react-router-dom";
import "./layoutAdmin.css";
import SignIn from "../../../authen/SignIn";

const LayoutAdmin = (prop) => {
  return (
    <>
      {prop.user && (
        <Router
          render={(props) => (
            <div className="layout">
              <Sidebar {...props} user={prop.user} />
              <div className="layout__content">
                {/* <TopNav
                  user={prop.user}
                  userHandler={prop.userHandler}
                ></TopNav> */}
                <div className="layout__content-main">
                  <Router>
                  </Router>
                </div>
              </div>
            </div>
          )}
        ></Router>
      )}

      {!prop.user && <SignIn {...prop}></SignIn>}
    </>
  );
};

export default LayoutAdmin;
