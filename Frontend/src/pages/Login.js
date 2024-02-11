import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";

const Login = ({login, setLogin}) => {
  const url = "http://127.0.0.1:8000";
  const navigate = useNavigate();
  const [formCredentials, setFormCredentials] = useState();

  const handleChange = (e) => {
    setFormCredentials((prevForm) => {
      return { ...prevForm, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${url}/users/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formCredentials),
      });
  
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('rentUser', data.key);
        setLogin(data.key);
        localStorage.setItem('userCredentials', JSON.stringify({ username: formCredentials.username, email: formCredentials.email }));
        toast.success('Login Successful');
        navigate('/');
      } else {
        const errorData = await response.json();
        toast.error(errorData?.non_field_errors[0]);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred during login');
    }
  };
  

  return (
    <div className="pt-5">
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
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
          bottom: 0,
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
        className="container border  p-4 rounded-4 shadow-lg text-center bg-white"
        style={{ maxWidth: "500px" }}
        onSubmit={handleSubmit}
      >
        <h1 className="fw-bold mb-4">Login</h1>
        <div className="rounded border py-2">
          <input
            type="text"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="rounded border py-2 mt-4">
          <input
            type="email"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="rounded border py-2 mt-4">
          <input
            type="password"
            className="w-100 h-100 rounded px-4"
            style={{ outline: "none", border: "none" }}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button className="rounded border py-2 mt-4 w-100 btn btn-success">
          Login
        </button>

        <p className="mt-4">
          Don't have an account?{" "}
          <span
            className="fw-bold"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
