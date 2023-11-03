import React, { useState } from "react";
import styles from"./Login.module.css";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../../redux/slices/userSlice";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";





const Login = ({authType}) => {

  const[username,setUsername]=useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {token} = useSelector((state)=>state.userSlice);
  const { formid } = useParams();
  

  
  
  const handleLogin=async()=>{
    if(token)
      navigate('/dashboard')
    
    try{
    const res = await axios.post("http://localhost:5000/auth/login", {
      email,
      password,
      token,
    });
     
      dispatch(loginAction(res.data))
       if(formid)navigate(`/form/:${formid}`);
       else navigate("/dashboard")
    }catch(e){
      }
      //  const previousUrl = sessionStorage.getItem("previousUrl");
    
      //  if (previousUrl) {
      //    // Clear the previous URL from sessionStorage
      //   //  sessionStorage.removeItem("previousUrl");

      //    // Redirect to the previous URL
      //    window.location.href = previousUrl;
      //  }

    
  }

 
  return (
    <>
      
          <div className={styles.loginContainer}>
            <div className={styles.loginHeader}>Login</div>
            <div className={styles.loginInput}>
              <TextField
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
                className={styles.loginInput}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                fullWidth
                sx={{ background: "white" }}
              />
            </div>
            <div className={styles.loginInput}>
              <TextField
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                fullWidth
                id="outlined-basic"
                label="Password"
                variant="outlined"
                sx={{ background: "white" }}
              />
            </div>
            <div onClick={handleLogin} className={styles.cusBtn}>
              Log in
            </div>
            <div>
              <span className={styles.sgnUpTxt}>Dont have an account yet?</span>
              <span className={styles.sgnUpBtn} onClick={authType}>
                Sign up
              </span>
            </div>
          </div>
          <div className={styles.banner}></div>
      
    </>
  );
};

export default Login;
