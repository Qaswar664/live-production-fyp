import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";

const ForgotPasssword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const [formErrors, setFormErrors] = useState({
    email: false,
    newPassword: false,
    answer: false,
  });

  const navigate = useNavigate();

  // Form validation function
  const validateForm = () => {
    const errors = {};

    if (!email) errors.email = true;
    if (!newPassword) errors.newPassword = true;
    if (!answer) errors.answer = true;

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  // Form submission function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post("/api/v1/auth/forgot-password", {
          email,
          newPassword,
          answer,
        });

        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <Layout title={"Forgot Password - Ecommerce APP"}>
      <div className="form-container ">
        <form onSubmit={handleSubmit}>
          <h4 className="title">RESET PASSWORD</h4>

          <div className={`mb-3 ${formErrors.email ? "has-error" : ""}`}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              autoComplete="new-password" // Suggest browser not to autofill
              aria-hidden="true"
              
            />
            {formErrors.email && (
              <div className="text-danger">Email is required</div>
            )}
          </div>
          <div className={`mb-3 ${formErrors.answer ? "has-error" : ""}`}>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favorite Sport Name "
              
            />
            {formErrors.answer && (
              <div className="text-danger">Favorite Sport Name is required</div>
            )}
          </div>
          <div className={`mb-3 ${formErrors.newPassword ? "has-error" : ""}`}>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              autoComplete="new-password" // Suggest browser not to autofill
              aria-hidden="true"
              
            />
            {formErrors.newPassword && (
              <div className="text-danger">Password is required</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPasssword;
