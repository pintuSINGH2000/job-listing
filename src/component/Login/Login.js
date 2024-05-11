import React, { useState } from "react";
import style from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { login } from "../../apis/auth";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email.trim()||!formData.password.trim()){
        toast.error("Fill the required field");
        return;
    }
   const res = await login(formData);
   if(res){
     navigate("/");
   }

}
  return (
    <div className={style.container}>
      <h1 className={style.h1}>Already have an account?</h1>
      <h2 className={style.h2}>Your personal job finder is here</h2>
      <input
        className={style.input}
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        className={style.input}
        type="password"
        placeholder="Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <button className={style.btn} onClick={handleSubmit}>Sign in</button>
      <p className={style.footer}>
        Don’t have an account? <span className={style.span} onClick={()=>navigate("/register")}>Sign Up</span>
      </p>
    </div>
  );
};

export default Login;
