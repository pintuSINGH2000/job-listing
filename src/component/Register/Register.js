import React, { useState } from "react";
import style from "./Register.module.css";
import { toast } from "react-toastify";
import { register } from "../../apis/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    checked:false,
  });
 const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]:value
    }))
  }

  const handleSubmit = async (e) => {
       e.preventDefault();
       if(!formData.name.trim()||!formData.email.trim()||!formData.password.trim()||!formData.phone.trim()){
           toast.error("Fill the required field");
           return;
       }
       const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if (!emailPattern.test(formData.email)) {
         toast.error("Please enter a valid email address.");
         return;
       }
       if (formData.password.length<6) {
        toast.error("Please enter 6 length password");
        return;
      }

      if(!formData.checked){
        toast.error("Please accept the term and condition");
        return;
      }
      const res = await register(formData);
      if(res){
        navigate("/");
      }

  }
  return (
    <div className={style.container}>
      <h1 className={style.h1}>Create an account</h1>
      <h2 className={style.h2}>Your personal job finder is here</h2>
      <input
        className={style.input}
        type="text"
        placeholder="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
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
        type="tel"
        placeholder="Mobile"
        name="phone"
        value={formData.phone}
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
      <div>
        <input
          className={style.checkbox}
          type="checkbox"
          id="tandc"
          name="tandc"
          checked={formData.checked}
          onChange={(e) => setFormData({ ...formData, checked: e.target.checked })}
        />
        <label htmlFor="tandc">
          By creating an account, I agree to our terms of use and privacy policy
        </label>
      </div>

      <button className={style.btn} onClick={handleSubmit}>Create Account</button>
      <p className={style.footer}>
        Already have an account? <span className={style.span} onClick={()=>navigate("/login")}>Sign In</span>
      </p>
    </div>
  );
};

export default Login;
