 import { useState } from "react";
import AuthContext from "./AuthContext";
 const AuthState=(props)=>{
const [token,setToken]=useState(() => localStorage.getItem("token"));
const[loginType,setLoginType]=useState(()=>localStorage.getItem("type"));
const [details,setDetails]=useState();
const clientDetails=async()=>{

   const response=await fetch("http://localhost:5000/api/auth/getClient",{
      method:"GET",
      headers:{
         "auth-token":localStorage.getItem("token")
      }
   });
const json=await response.json()
setDetails(json)
}
 return(
 
    <AuthContext.Provider value={{token,setToken,loginType,setLoginType,clientDetails,details,setDetails}}>
        {props.children}
    </AuthContext.Provider>
 )
 }
export default AuthState;