import React, { useState } from "react";
import s from "./Signup.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Signup = ({ authType }) => {
  //const [signUpbtn, setSignUpBtn] = useState(false);

  return (
    <>
      <div className={s.banner}></div>
      <div className={s.loginContainer}>
        <div className={s.loginHeader}>Register</div>

        <div className={s.loginInput}>
          <TextField
            className={s.loginInput}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            fullWidth
            sx={{ background: "white" }}
          />
        </div>
        <div className={s.loginInput}>
          <TextField
            className={s.loginInput}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            sx={{ background: "white" }}
          />
        </div>

        <div className={s.loginInput}>
          <TextField
            className="loginInput"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ background: "white" }}
          />
        </div>
        <div className={s.loginInput}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ background: "white" }}
          />
        </div>
        <div className={s.cusBtn}>
          Sign Up
          {/* <Button
                variant="contained"
                fullWidth
                
                sx={{ background: "hwb(162 51% 2%)",fontSize:"1.2rem" }}
              >
                Login
              </Button> */}
          {/* <button className="cusBtn" text="hello">Sign in</button> */}
        </div>
        <div>
          <span className={s.sgnUpTxt}>Dont have an account yet?</span>
          <span className={s.sgnUpBtn} onClick={authType}>
            Sign up
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
