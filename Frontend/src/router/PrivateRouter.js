import React from "react";
import { Outlet } from "react-router";
import Login from "../pages/Login";

const PrivateRouter = ({ login }) => {
  return login ? <Outlet /> : <Login />;
};

export default PrivateRouter;
