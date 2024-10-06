import React, { useEffect } from "react";
import "../assets/boxicons-2.0.7/css/boxicons.min.css";
import "../assets/css/grid.css";
import "../assets/css/index.css";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SignIn from "../authen/SignIn";
import { useState } from "react";
const UserLayout = () =>{
    const [header, setHeader] = useState(1);
    const [user, setUser] = useState(null);
    const userHandler = (user) => {
        setUser(user);
      };
    return(
        <div className="col-10 offset-1">
            <Header
            header={header}
            ></Header>
            <Switch>
            <Route path="/sign-in" exact>
          <SignIn userHandler={userHandler}></SignIn>
        </Route>
            </Switch>
            <Footer></Footer>
            <ToastContainer></ToastContainer>           
        </div>
    );
}
export default UserLayout;