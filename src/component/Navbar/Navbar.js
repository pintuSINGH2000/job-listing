import React, { useState } from "react";
import style from "./Navbar.module.css";
import shape1 from '../../assest/Rectangle3.png';
import shape2 from '../../assest/Rectangle4.png';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = () => {
    const [isLoggedIn] = useState(!!localStorage.getItem("token"));
    const name = JSON.parse(localStorage.getItem("name"));
    const navigate= useNavigate();

    const handleLogout = () => {
      localStorage.clear();
      toast.success("User Logout Successfully");
      navigate("/login");
    }
  return (
    <div className={style.container}>
     <img src={shape1} alt="shape1" className={style.shape1}/>
     <img src={shape2} alt="shape1" className={style.shape2}/>
     <h1 className={style.h1}>Jobfinder</h1>
     {isLoggedIn?(
         <div className={style.btnContainer}>
          <div className={style.logout} onClick={handleLogout}>Logout</div>
          <div className={style.name}>Hello! {name}</div>
         </div>
         
     ):(
         <div className={style.btnContainer}>
            <button className={style.login} onClick={()=>navigate("/login")}>Login</button>
            <button className={style.register} onClick={()=>navigate("/register")}>Register</button>
         </div>
     )}
    </div>
  )
}

export default Navbar