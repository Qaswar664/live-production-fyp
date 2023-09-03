import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { NavLink, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = true;
    if (!password) errors.password = true;

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, email: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormErrors((prevErrors) => ({ ...prevErrors, password: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post("/api/v1/auth/login", {
          email,
          password,
        });

        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          setAuth({
            ...auth,
            user: res.data.user,
            token: res.data.token,
          });
          localStorage.setItem("auth", JSON.stringify(res.data));
          navigate(location.state || "/");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("invalid credentials or user don't have an account");
      }
    }
  };

  return (
    <Layout title="Login - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <p className="title text-dark">
            Welcome Back<br></br>
            to <span className="al_jannat_mall">e-commerce store</span>
          </p>

          <div className="mb-3">
            <input
              type="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
            />
            {formErrors.email && (
              <div className="invalid-feedback">Email is required</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={`form-control ${
                formErrors.password ? "is-invalid" : ""
              }`}
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              autoComplete="new-password" // Suggest browser not to autofill
              aria-hidden="true"
            />
            {formErrors.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>
          <div className="mb-3">
            <button
              type="button"
              className="btn forgot-btn btn btn-info w-100"
              onClick={() => {
                navigate("/forgot-password");
              }}
            >
              Forgot Password
            </button>
          </div>

          <button type="submit" className="forgot-btn btn btn-info w-100 mb-1">
            LOGIN
          </button>
          <p className="d-flex">
            don't have an account
            {/* <span className="al_jannat_mall">register-now</span>  */}
            <NavLink to="/register" className="ms-2 text-decoration-none">
              register-now
            </NavLink>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
