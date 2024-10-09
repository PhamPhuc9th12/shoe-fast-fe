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
import ForgotPassword from "../authen/ForgotPassword";
import Register from "../authen/Register";
import Profile from "../authen/Profile";
import Home from "../component/Home";
import { useState } from "react";
const UserLayout = () => {
    const [header, setHeader] = useState(1);
    const [user, setUser] = useState(null);
    const [temp, setTemp] = useState(true);
    const [keyword, setKeyword] = useState("");

    const userHandler = (user) => {
        setUser(user);
    };
    const changeHeaderHandler = (value) => {
        setHeader(value);
    };
    const refresh = (data) => {
        setTemp(data);
    };
    const searchHandler = (keyword) => {
        setKeyword(keyword);
    };
    return (
        <div className="col-10 offset-1">
            <Header
                header={header}
                searchHandler={searchHandler}
                user={user}
                userHandler={userHandler}
                refresh={refresh}
            ></Header>
            <Switch>
                <Route path="/" exact>
                    <Home changeHeaderHandler={changeHeaderHandler} user={user}></Home>
                </Route>
                <Route path="/sign-in" exact>
                    <SignIn userHandler={userHandler}></SignIn>
                </Route>
                <Route path="/register" exact>
                    <Register></Register>
                </Route>
                <Route path="/forgot-password" exact>
                    <ForgotPassword></ForgotPassword>
                </Route>
                <Route path="/profile" exact>
                    <Profile user={user} refresh={refresh} userHandler={userHandler}></Profile>
                </Route>
            </Switch>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
}
export default UserLayout;