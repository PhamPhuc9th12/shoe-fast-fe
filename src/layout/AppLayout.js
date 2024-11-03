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
import Search from "../component/Search";
import ForgotPassword from "../authen/ForgotPassword";
import Register from "../authen/Register";
import Profile from "../authen/Profile";
import Home from "../component/Home";
import Cart from "../component/Cart";
import Checkout from "../component/Checkout";
import ProductDetail from "../component/ProductDetail";
import Product from "../component/Product";
import Blog from "../component/blog/Blog";
import OrderDetail from "../component/OrderDetail";
import Order from "../component/Order";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import DashboardAdmin from "../component/admin/dashboard/DashboardAdmin";
import ProductForm from "../component/admin/product/ProductForm";
import Sidebar from "../component/admin/sidebar/Sidebar";
import TopNav from "../component/admin/topnav/TopNav"
const UserLayout = () => {
    const [user, setUser] = useState(null);
    const [temp, setTemp] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [cartItem, setCartItem] = useState([]);
    const [outStock, setOutStock] = useState([]);
    const [buy, setBuy] = useState([]);
    const [size, setSize] = useState("");

    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    const userHandler = (user) => {
        setUser(user);
    };
    const refresh = (data) => {
        setTemp(data);
    };
    const searchHandler = (keyword) => {
        setKeyword(keyword);
    };

    const addHandler = (data) => {
        const res = cartItem.find((item) => item.id === data.id);
        if (res) {
            setCartItem(
                cartItem.map((item) =>
                    item.id === data.id
                        ? { ...res, quantity: res.quantity + data.quantity }
                        : item
                )
            );
        } else {
            setCartItem([...cartItem, data]);
        }
    };

    //cart
    const cartHandler = (data) => {
        setCartItem(data);
    };
    const outStockHandler = (data) => {
        setOutStock(data);
    };
    const buyHandler = (id) => {
        setBuy([...buy, id]);
    };
    const cancelBuyHandler = (id) => {
        const res = buy.filter((item) => item != id);
        setBuy(res);
    };
    const clearBuyHandler = () => {
        setBuy([]);
    };

    //checkout
    const clearHandler = () => {
        const res = cartItem.filter((item) => !buy.includes(item.id + ""));
        setCartItem(res);
    };


    const setCartItemHandler = (data) => {
        setCartItem(data);
    };


    return (
        <div className={`${isAdminRoute ? "layout" : ""} col-10 offset-1`}>
            {!isAdminRoute && (
                <Header
                    searchHandler={searchHandler}
                    user={user}
                    userHandler={userHandler}
                    refresh={refresh}
                />
            )}
            {isAdminRoute && (<Sidebar className="sidebar" user={user} />)}
            {isAdminRoute && (<div className="topnav">
                <TopNav user={user} userHandler={userHandler} />
            </div>)}
            <div className={`${isAdminRoute ? "content-wrapper" : ""} `}>
                <Switch>
                    <Route path="/" exact>
                        <Home user={user}></Home>
                    </Route>

                    <Route path="/store" exact>
                        <Product
                            user={user}
                        ></Product>
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

                    <Route path={`/product-detail/:id`} exact>
                        <ProductDetail
                            user={user}
                            addHandler={addHandler}
                        ></ProductDetail>
                    </Route>

                    <Route path="/search-page" exact>
                        <Search keyword={keyword} user={user}></Search>
                    </Route>

                    <Route path="/cart" exact>
                        <Cart
                            outStockHandler={outStockHandler}
                            buyHandler={buyHandler}
                            cancelBuyHandler={cancelBuyHandler}
                            clearBuyHandler={clearBuyHandler}
                            buy={buy}
                            user={user}
                            cartItem={cartItem}
                            cartHandler={cartHandler}
                        ></Cart>
                    </Route>

                    <Route path="/checkout" exact>
                        <Checkout
                            temp={temp}
                            buy={buy}
                            outStockHandler={outStockHandler}
                            user={user}
                            cartItem={cartItem}
                            clearHandler={clearHandler}
                            setCartItemHandler={setCartItemHandler}
                        ></Checkout>
                    </Route>
                    <Route path="/order/detail/:id" exact>
                        <OrderDetail
                            user={user}
                        ></OrderDetail>
                    </Route>
                    <Route path="/order" exact>
                        <Order user={user}></Order>
                    </Route>
                    <Route path="/blog" exact>
                        <Blog></Blog>
                    </Route>

                    <>
                        <Route path="/admin/dashboard" exact>
                            <DashboardAdmin className="dashboard-content" ></DashboardAdmin>
                        </Route>
                        <Route path="/admin/add-product" exact>
                            <ProductForm></ProductForm>
                        </Route>
                    </>
                </Switch>
            </div>

            {!isAdminRoute && (<Footer></Footer>)}
            <ToastContainer></ToastContainer>
        </div>
    );
}
export default UserLayout;