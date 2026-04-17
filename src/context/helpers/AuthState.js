 import { useState } from "react";
import AuthContext from "./AuthContext";
 const AuthState=(props)=>{
const [token,setToken]=useState(() => sessionStorage.getItem("token"));
const[loginType,setLoginType]=useState(()=>sessionStorage.getItem("type"));
const [details,setDetails]=useState();
const clientDetails=async()=>{
if(sessionStorage.getItem("type")==="user"){
   const response=await fetch("https://hire-helper-3.onrender.com/api/auth/getClient",{
      method:"GET",
      headers:{
         "auth-token":sessionStorage.getItem("token")
      }
   });
const json=await response.json()
setDetails(json)}
else if(sessionStorage.getItem("type")==="helper"){
      const response=await fetch("https://hire-helper-3.onrender.com/api/HelperAuth/getClient",{
      method:"GET",
      headers:{
         "auth-token":sessionStorage.getItem("token")
      }
   });
const json=await response.json()
setDetails(json)
}
}
 return(
 
    <AuthContext.Provider value={{token,setToken,loginType,setLoginType,clientDetails,details,setDetails}}>
        {props.children}
    </AuthContext.Provider>
 )
 }
export default AuthState;