import React, { useState } from "react";
import s1 from "./Authpage.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Login from "./Authcomponents/Login";
import Signup from "./Authcomponents/Signup"

const Authpage = () => {
  const [signUpbtn, setSignUpBtn] = useState(false);

  const HandleAuthType = () => {
    setSignUpBtn(!signUpbtn);
  };

  return (
    <>
      <div className={s1.main}>
        <div className={s1.parentContainer}>
          {signUpbtn ? (
            <Login authType={HandleAuthType} />
          ) : (
            <Signup authType={HandleAuthType} />
          )}
        </div>
      </div>
    </>
  );
};

export default Authpage;
