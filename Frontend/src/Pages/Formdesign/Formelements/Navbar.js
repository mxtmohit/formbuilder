import React, { useState } from "react";
import s from "./Navbar.module.css";

const Navbar = ({ title,showResponse }) => {

  

  return (
    <div className={s.main}>
      <div className={s.leftBox}>{title}</div>
      <div className={s.mdlBtns}>
        <span onClick ={()=>showResponse(false)}className={s.Btn}>Questions</span>
        <span onClick ={()=>showResponse(true)}className={s.Btn}>Responses</span>
      </div>
      <div className={s.rightBox}>{title}</div>
    </div>
  );
};

export default Navbar;
