import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import "./signin.css";
import { signIn } from "../api/AuthenticateApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getInformation } from "../api/AccountApi";


const SignIn = (props) => {
  const history = useHistory();

  const signInHandler = (data) => {
    const userFlag = {
      ...data,
      admin: false,
    };

    signIn(userFlag)
      .then((res) => {
        const accessToken = res.data.accessToken;

        // Kiểm tra xem token có hợp lệ không
        if (!accessToken) {
          throw new Error("Token không hợp lệ");
        }

        // Lưu token vào localStorage
        localStorage.setItem("token", accessToken);

        console.log("Token ===>>>>", accessToken);

        // Lấy thông tin người dùng
        return getInformation(accessToken);
      })
      .then((res) => {
        // Cập nhật thông tin người dùng
        props.userHandler(res.data);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("password", "123456");

        // Điều hướng về trang chủ
        history.push("/");
        toast.success("Đăng nhập thành công!");
      })
      .catch((error) => {
        console.error("Error fetching user information:", error);
        toast.error(error.response?.data?.Errors || "Đã xảy ra lỗi. Vui lòng thử lại.");
      });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div>
      {" "}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Đăng nhập</h2>
                    <form
                      className="needs-validation"
                      onSubmit={handleSubmit(signInHandler)}
                    >
                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          {...register("username", {
                            required: true,
                            pattern: /^\s*\S+.*/,
                          })}
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Tài khoản
                        </label>
                        {errors.username && (
                          <div className="alert alert-danger" role="alert">
                            Tài khoản không hợp lệ!
                          </div>
                        )}
                      </div>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="typePasswordX"
                          className="form-control form-control-lg"
                          {...register("password", {
                            required: true,
                            pattern: /^\s*\S+.*/,
                          })}
                        />
                        <label className="form-label" htmlFor="typePasswordX">
                          Mật khẩu
                        </label>
                        {errors.password && (
                          <div className="alert alert-danger" role="alert">
                            Mật khẩu không hợp lệ!
                          </div>
                        )}
                      </div>
                      <p className="small mb-5 pb-lg-2">
                        <a className="text-black-50" href="/forgot-password">
                          Quên mật khẩu?
                        </a>
                      </p>
                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                      >
                        Đăng nhập
                      </button>
                    </form>
                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg" />
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2" />
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg" />
                      </a>
                    </div>
                  </div>
                  <div>
                    <p className="mb-0">
                      Chưa có tài khoản?{" "}
                      <NavLink
                        to="/register"
                        exact
                        className="text-white-50 fw-bold"
                      >
                        Đăng kí ngay
                      </NavLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
