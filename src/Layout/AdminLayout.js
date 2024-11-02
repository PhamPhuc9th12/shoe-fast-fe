import React, { useState } from "react";
import "../assets/boxicons-2.0.7/css/boxicons.min.css";
import "../assets/css/grid.css";
import "../assets/css/index.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import '../static/css/style.css';
import Account from "../component/admin/Account";
import DashboardAdmin from "../component/admin/dashboard/DashboardAdmin";
import { BrowserRouter as Router } from "react-router-dom";
import ProductForm from "../component/admin/product/ProductForm";
import Product from "../component/admin/product/Product";
import EditProduct from "../component/admin/product/EditProduct";
const AdminLayOut = () => {

    const [user, setUser] = useState(null);

    const userHandler = (user) => {
        setUser(user);
    };

    return (
        <>
            <Router path="/account" exact>
                <Account user={user} userHandler={userHandler}></Account>
                <ToastContainer></ToastContainer>
            </Router>
            <Router path="/admin" exact>
                <DashboardAdmin ></DashboardAdmin>
            </Router>
            <Router path="/products" exact>
                <Product></Product>
            </Router>
            <Router path="/add-product" exact>
                <ProductForm></ProductForm>
            </Router>
            <Router path={`/product-detail/:id`} exact>
                <EditProduct></EditProduct>
            </Router>
        </>
    );
};

export default AdminLayOut;
