import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { NavLink} from "react-router-dom";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
    phone: false,
    address: false,
    answer: false,
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (name.length < 3) errors.name = true;
    if (email.length < 3) errors.email = true;
    if (password.length < 3) errors.password = true;
    if (phone.length < 3) errors.phone = true;
    if (address.length < 3) errors.address = true;
    if (answer.length < 3) errors.answer = true;

    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    const updatedFormErrors = { ...formErrors, [field]: value.length < 3 };
    setFormErrors(updatedFormErrors);

    // Update the state based on the field
    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "answer":
        setAnswer(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await axios.post("/api/v1/auth/register", {
          name,
          email,
          password,
          phone,
          address,
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
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
        <p className="title text-dark">create-your<br></br>
           <span className="al_jannat_mall">
          account
            </span> 
          
          </p>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => handleInputChange(e, "name")}
              className={`form-control ${
                formErrors.name ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Name"
            />
            {formErrors.name && (
              <div className="invalid-feedback">Name is not valid</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              className={`form-control ${
                formErrors.email ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Email"
              autoComplete="off"
            />
            {formErrors.email && (
              <div className="invalid-feedback">Email is not valid</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => handleInputChange(e, "password")}
              className={`form-control ${
                formErrors.password ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Password"
              autoComplete="new-password"
              aria-hidden="true"
            />
            {formErrors.password && (
              <div className="invalid-feedback">Password is not valid</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => handleInputChange(e, "phone")}
              className={`form-control ${
                formErrors.phone ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Phone"
            />
            {formErrors.phone && (
              <div className="invalid-feedback">Phone is not valid</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => handleInputChange(e, "address")}
              className={`form-control ${
                formErrors.address ? "is-invalid" : ""
              }`}
              placeholder="Enter Your Address"
            />
            {formErrors.address && (
              <div className="invalid-feedback">Address is not valid</div>
            )}
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => handleInputChange(e, "answer")}
              className={`form-control ${
                formErrors.answer ? "is-invalid" : ""
              }`}
              placeholder="What is Your Favorite sports"
            />
            {formErrors.answer && (
              <div className="invalid-feedback">Answer is not valid</div>
            )}
          </div>
          <button type="submit" className="forgot-btn btn btn-info w-100 mb-1">
            REGISTER
          </button>
          <p className="d-flex">
            already have an account
            {/* <span className="al_jannat_mall">register-now</span>  */}
            <NavLink to="/login" className="ms-2 text-decoration-none">
              login-now
            </NavLink>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
