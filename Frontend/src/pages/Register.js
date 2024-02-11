import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const url = "http://127.0.0.1:8000";
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      username: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      password: Yup.string()
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .min(8, "Password must be at least 8 characters long")
        .required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Password confirmation is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`${url}/users/register/`, values, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        toast.success("User Created Successfully")
        navigate("/login")
      } catch (error) {
        for (let err of Object.keys(error.response.data)){
          console.log(err)
          toast.error(`${err.toUpperCase()}: ${error.response.data[err]}`)
        }
      }
    },
  });

  return (
    <div className="pt-5">
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: -200,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,0.1)",
          zIndex: -1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: -200,
          right: 0,
          left: 0,
          backgroundImage:
            "url(https://msms.eu/wp-content/uploads/2020/04/Background-website-01.jpg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          zIndex: "-3",
        }}
      ></div>
      <form
        className="container border p-4 rounded-4 shadow-lg text-center bg-white"
        style={{ maxWidth: "500px" }}
        onSubmit={formik.handleSubmit}
      >
        <h1 className="fw-bold mb-4">Register</h1>

        <div className="rounded border py-2">
          <input
            type="text"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="First Name"
            name="first_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.first_name}
          />
        </div>
        {formik.touched.first_name && formik.errors.first_name && (
          <div className="text-danger mt-2">{formik.errors.first_name}</div>
        )}

        <div className="rounded border py-2 mt-4">
          <input
            type="text"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Last Name"
            name="last_name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.last_name}
          />
        </div>
        {formik.touched.last_name && formik.errors.last_name && (
          <div className="text-danger mt-2">{formik.errors.last_name}</div>
        )}

        <div className="rounded border py-2 mt-4">
          <input
            type="text"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Username"
            name="username"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            
          />
        </div>
        {formik.touched.username && formik.errors.username && (
          <div className="text-danger mt-2">{formik.errors.username}</div>
        )}

        <div className="rounded border py-2 mt-4">
          <input
            type="email"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            
          />
        </div>
        {formik.touched.email && formik.errors.email && (
          <div className="text-danger mt-2">{formik.errors.email}</div>
        )}

        <div className="rounded border py-2 mt-4">
          <input
            type="password"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            
          />
        </div>
        {formik.touched.password && formik.errors.password && (
          <div className="text-danger mt-2">{formik.errors.password}</div>
        )}
        {formik.touched.password && !formik.errors.password && (
          <div className="text-success mt-2">Password is valid</div>
        )}

        <div className="rounded border py-2 mt-4">
          <input
            type="password"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Password Again"
            name="password2"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password2}
            
          />
        </div>
        {formik.touched.password2 && formik.errors.password2 && (
          <div className="text-danger mt-2">{formik.errors.password2}</div>
        )}
        {formik.touched.password2 && !formik.errors.password2 && (
          <div className="text-success mt-2">Passwords match</div>
        )}

        <button type="submit" className="rounded border py-2 mt-4 w-100 btn btn-success">
          Register
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <span
            className="fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
