import React, { useState } from "react";
import s from "./Signup.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginAction } from "../../../redux/slices/userSlice";

const Signup = ({ authType }) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.userSlice);

  const HandleSignup = async (event) => {
    
    try {
      const userdata = await axios({
        method: "post",
        url: "/auth/signup",
        data: { firstname, lastname , email, password},
      });

      navigate("/dashboard");

      // setdata(userdata.data);

      dispatch(loginAction(userdata.data));
    } catch (e) {
     
    }
  };

  return (
    <>
      <div className={s.banner}></div>
      <div className={s.loginContainer}>
        <div className={s.loginHeader}>Register</div>

        <div className={s.loginInput}>
          <TextField
            className={s.loginInput}
            onChange={(event) => setFirstName(event.target.value)}
            value={firstname}
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
            onChange={(event) => setLastName(event.target.value)}
            value={lastname}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            sx={{ background: "white" }}
          />
        </div>
        <div className={s.loginInput}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={s.loginInput}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
            sx={{ background: "white" }}
          />
        </div>
        <div className={s.loginInput}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={{ background: "white" }}
          />
        </div>
        <div onClick={HandleSignup} className={s.cusBtn}>
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
          <span className={s.sgnUpTxt}>Already have an account yet?</span>
          <span className={s.sgnUpBtn} onClick={authType}>
            Login
          </span>
        </div>
      </div>
    </>
  );
};

export default Signup;
