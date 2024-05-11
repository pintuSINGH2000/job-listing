import React from "react";
import style from "./Coverimg.module.css";


const Coverimg = ({cover,header}) => {
  return (
    <div className={style.container}>
        <h1 className={style.h1}>{header}</h1>
      <img
        src={cover}
        alt="login"
        style={{ height: "100vh", width: "50vw" }}
      />
    </div>
  );
};

export default Coverimg;
