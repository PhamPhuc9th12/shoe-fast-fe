import React from "react";
import "./register.css";
import { NavLink, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerAccount } from "../api/AuthenticateApi";

const Register = () => {
    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmitHandler = (data) => {
        registerAccount(data)
            .then(() => {
                toast.success("Đăng kí thành công!");
                history.push("/sign-in");
            })
            .catch((error) => {
                // Kiểm tra xem error có response hay không để log lỗi phù hợp
                if (error.response) {
                    // Nếu có response từ server
                    toast.error(error.response.data.message || "Có lỗi xảy ra!"); // Hiển thị lỗi từ server
                } else if (error.request) {
                    // Nếu không có response
                    toast.error("Không thể kết nối đến server. Vui lòng thử lại sau.");
                } else {
                    // Nếu có lỗi khác
                    toast.error("Đã xảy ra lỗi: " + error.message);
                }
            });
    };


    const renderInput = (type, id, label, registerProps, errorMessage) => (
        <div className="form-outline mb-4">
            <input
                type={type}
                id={id}
                className="form-control form-control-lg"
                {...register(id, registerProps)}
            />
            <label className="form-label" htmlFor={id}>
                {label}
            </label>
            {errorMessage && (
                <div className="alert alert-danger" role="alert">
                    {errorMessage}
                </div>
            )}
        </div>
    );

    const renderRadioGroup = (name, options) => (
        <div className="mb-4">
            <h6 className="mb-2 pb-1">Giới tính:</h6>
            {options.map((option) => (
                <div className="form-check form-check-inline" key={option.value}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name={name}
                        id={option.id}
                        value={option.value}
                        {...register(name, { required: true })}
                    />
                    <label className="form-check-label" htmlFor={option.id}>
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row justify-content-center align-items-center h-100">
                    <div className="col-12 col-lg-9 col-xl-7">
                        <div className="card bg-dark text-white" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-4 p-md-5">
                                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 text-center">Đăng kí</h3>
                                <form className="needs-validation" onSubmit={handleSubmit(onSubmitHandler)}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            {renderInput("text", "username", "Username", {
                                                required: true,
                                                pattern: /^\s*\S+.*/,
                                            }, errors.username && "Tài khoản không hợp lệ!")}
                                        </div>
                                        <div className="col-md-6">
                                            {renderInput("password", "password", "Password", {
                                                required: true,
                                                pattern: /^\s*\S+.*/,
                                            }, errors.password && "Mật khẩu không hợp lệ!")}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {renderInput("text", "fullName", "Họ tên", {
                                                required: true,
                                                pattern: /^\s*\S+.*/,
                                            }, errors.fullName && "Họ tên không hợp lệ!")}
                                        </div>
                                        <div className="col-md-6">
                                            {renderRadioGroup("gender", [
                                                { id: "femaleGender", value: "Nữ", label: "Nữ" },
                                                { id: "maleGender", value: "Nam", label: "Nam" },
                                            ])}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {renderInput("text", "email", "Email", {
                                                required: true,
                                                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            }, errors.email && "Email không hợp lệ!")}
                                        </div>
                                        <div className="col-md-6">
                                            {renderInput("tel", "phone", "Số điện thoại", {
                                                required: true,
                                                pattern: /^0[0-9]{9}$/,
                                            }, errors.phone && "Số điện thoại không hợp lệ!")}
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            {renderInput("date", "birthdate", "Ngày sinh", {
                                                required: true,
                                                validate: value => {
                                                    const today = new Date();
                                                    const birthdate = new Date(value);
                                                    return birthdate < today || "Ngày sinh không hợp lệ!";
                                                },
                                            }, errors.birthdate?.message || "Vui lòng nhập ngày sinh!")}
                                        </div>
                                    </div>

                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <textarea
                                                className="black-text form-control"
                                                id="address"
                                                rows="5"
                                                {...register("address")}
                                            ></textarea>
                                            <label className="form-label select-label">Địa chỉ</label>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-2 mb-3">
                                        <button className="btn btn-primary btn-lg" type="submit">
                                            Đăng kí
                                        </button>
                                    </div>
                                    <div>
                                        <p className="mb-0">
                                            Đã có tài khoản?{" "}
                                            <NavLink to="/sign-in" className="text-white-50 fw-bold">
                                                Đăng nhập ngay
                                            </NavLink>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
