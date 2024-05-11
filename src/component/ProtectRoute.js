import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ Component }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
     
      {token ?
      <Component />
      :<Navigate to="/login" />}
    </div>
  );
};

export default ProtectRoute;
