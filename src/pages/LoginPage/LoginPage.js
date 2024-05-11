import React from "react";
import Login from "../../component/Login/Login";
import login from "../../assest/login.png";
import Coverimg from "../../component/Coverimg/Coverimg";


const LoginPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <Login />
      <Coverimg cover={login} header=""/>
    </div>
  );
};

export default LoginPage;
