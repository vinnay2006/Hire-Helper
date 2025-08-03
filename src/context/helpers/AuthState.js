 import { useState } from "react";
import AuthContext from "./AuthContext";
 const AuthState=(props)=>{
const [token,setToken]=useState(() => localStorage.getItem("token"));


 return(
 
    <AuthContext.Provider value={{token,setToken}}>
        {props.children}
    </AuthContext.Provider>
 )
 }
export default AuthState;