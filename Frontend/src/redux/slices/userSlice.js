import { createSlice } from "@reduxjs/toolkit";


const userdetail = JSON.parse(localStorage.getItem("userDetail"));
let initialState = {
  fname: "",
  lname: "",
  email: "",
  token: "",
};

if(userdetail)
initialState = userdetail

const login = (state, {payload}) => {
    
  state.fname = payload.user.firstname
    state.lname = payload.user.lastname
    state.email = payload.user.email
    state.token = payload.token
   
    
    localStorage.setItem("userDetail", JSON.stringify(state));
    
    
};
const logout = (state, {payload}) => {
  state={};
  
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: { loginAction:login, logoutAction:logout },
});

export const {loginAction,logoutAction}=userSlice.actions
export default userSlice.reducer;
