import React from 'react'
import Register from '../../component/Register/Register';
import login from "../../assest/login.png";
import Coverimg from '../../component/Coverimg/Coverimg'


const RegisterPage = () => {
  return (
    <>
    
    <div style={{ display: "flex" }}>
    <Register />
    <Coverimg cover={login} header="Your Personal Job Finder"/>
  </div>
  </>
  )
}

export default RegisterPage