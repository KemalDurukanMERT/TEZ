import React, { useState } from "react";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Register from "../pages/Register";
import DisplayCars from "../pages/DisplayCars";
import CarDetail from "../pages/CarDetail";
import RentedCars from "../pages/RentedCars";
import PrivateRouter from "./PrivateRouter";
import { Routes, Route } from "react-router";
import NavbarComponent from "../Components/Navbar";
import RentCar from "../pages/RentCar";

const AppRouter = () => {
  const [login, setLogin] = useState(localStorage.getItem("rentUser") || false)
  return (
    <>
      <NavbarComponent login={login} setLogin={setLogin}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login  login={login} setLogin={setLogin}/>} />
        <Route path="/register" element={<Register login={login} setLogin={setLogin}/>} />
        <Route path="/cars" element={<DisplayCars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/rent-car" element={<PrivateRouter login={login} setLogin={setLogin}/>}>
          <Route path="" element={<RentCar />}/>
        </Route>
        <Route path="/rented-car" element={<PrivateRouter login={login} setLogin={setLogin}/>}>
            <Route path="" element={<RentedCars/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
