import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route } from "react-router-dom";
import Header from "../common/Header";
import Footer from "../common/Footer";
const UserLayout = () =>{

    return(
        <div className="col-10 offset-1">
            <Header></Header>
            <Switch>
                
            </Switch>
            <Footer></Footer>
            <ToastContainer></ToastContainer>           
        </div>
    );
}
export default UserLayout;